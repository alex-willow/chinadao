import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve('public')

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '_renamed') return []
      return walk(full)
    }
    return [full]
  })
}

function isPhoto(file) {
  const name = file.replaceAll('\\', '/')
  if (name.includes('/about/gallery-')) return true
  if (/-(photo|offer)\.(jpe?g|png)$/i.test(name)) return true
  if (/hero-photo|faq-photo|contact-photo|about-photo|why-photo/.test(name)) return true
  if (/service-(language|degree|consult|programs)\.jpg$/.test(name)) return true
  if (/\/offer-\d+\./.test(name)) return true
  if (/\/review-.*\.(jpe?g|png)$/.test(name)) return true
  return false
}

function maxEdge(file) {
  const name = path.basename(file)
  if (name.startsWith('gallery-')) return 900
  if (name.startsWith('offer-')) return 800
  if (name.includes('-offer.')) return 900
  if (/review-/.test(name) && !name.includes('offer')) return 400
  if (/hero-avatar/.test(name)) return 128
  if (name === 'logo.png' || name === 'logo-light.png') return 192
  if (name === 'button.png' || name === 'button-hover.png') return 640
  // Thin strips: shrinking the width also crushes their few pixels of height into a blur.
  if (/nav-fill|nav-line/.test(name)) return 2000
  if (/photo-shape|card-shape|menu-shape/.test(name)) return 800
  if (isPhoto(file)) return 1600
  return 1600
}

async function convert(file) {
  const ext = path.extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null
  if (path.basename(file) === 'og.jpg') return 'skip'

  const out = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const photo = isPhoto(file)
  const edge = maxEdge(file)
  const meta = await sharp(file, { failOn: 'none' }).metadata()
  let pipeline = sharp(file, { failOn: 'none' }).rotate()
  if ((meta.width || 0) > edge || (meta.height || 0) > edge) {
    pipeline = pipeline.resize({
      width: edge,
      height: edge,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  if (photo) {
    await pipeline.webp({ quality: 82, smartSubsample: true, effort: 6 }).toFile(out)
  } else {
    await pipeline.webp({ quality: 90, alphaQuality: 100, smartSubsample: true, effort: 6 }).toFile(out)
  }

  const before = fs.statSync(file).size
  const after = fs.statSync(out).size
  return { file, out, before, after, photo }
}

const files = walk(ROOT).filter((file) => /\.(png|jpe?g)$/i.test(file) && !file.includes(`${path.sep}_renamed${path.sep}`))
const results = []
for (const file of files) {
  const result = await convert(file)
  if (result && result !== 'skip') results.push(result)
}

const og = path.join(ROOT, 'og.jpg')
if (fs.existsSync(og)) {
  const tmp = `${og}.tmp.jpg`
  await sharp(og)
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(tmp)
  fs.renameSync(tmp, og)
}

const before = results.reduce((sum, item) => sum + item.before, 0)
const after = results.reduce((sum, item) => sum + item.after, 0)
console.log(`converted ${results.length} images`)
console.log(`before ${(before / 1024 / 1024).toFixed(1)} MB`)
console.log(`after ${(after / 1024 / 1024).toFixed(1)} MB`)
