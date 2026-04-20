import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const BASE = 'https://bugatti.store/cdn/shop/files';

const ASSETS = [
  // Logo SVG
  { url: `${BASE}/logo-text-white.svg?v=1731051277`, dest: 'images/logo-text-white.svg' },
  // Favicon
  { url: `${BASE}/bugatti-favicon.png?crop=center`, dest: 'images/favicon.png' },
  // Slideshow hero images
  { url: `${BASE}/15-bugatti-the-wheels-solitaire-hommage-2.jpg?v=1774476024&width=1920`, dest: 'images/slideshow/slide-1.jpg' },
  { url: `${BASE}/08_BUGATTI_Carbon-Champagne.jpg?v=1774476386&width=1920`, dest: 'images/slideshow/slide-2.jpg' },
  { url: `${BASE}/42222_WE_Lifestyle.jpg?v=1774476211&width=1920`, dest: 'images/slideshow/slide-3.jpg' },
  // Featured banner images
  { url: `${BASE}/20yr_hoodie_in_Chiron.jpg?v=1774476748&width=1200`, dest: 'images/banners/20yr-hoodie-chiron.jpg' },
  { url: `${BASE}/25-1339-TransparentGlobalLimited_CS0126.jpg?v=1753962178&width=1200`, dest: 'images/banners/navy-tshirt.jpg' },
  // Products
  { url: `${BASE}/navy-blue-t-shirt-bugatti-logo-25-1339.jpg?v=1764245405&width=800`, dest: 'images/products/navy-blue-tshirt.jpg' },
  { url: `${BASE}/bugatti-20yr-veyron-ettore-edition-hoodie.jpg?v=1773834528&width=800`, dest: 'images/products/veyron-hoodie.jpg' },
  { url: `${BASE}/bugatti-20yr-veyron-ettore-edition-t-shirt.jpg?v=1773834825&width=800`, dest: 'images/products/veyron-tshirt.jpg' },
  { url: `${BASE}/bugatti_duffle-bag-01_89ba5057-263d-474a-92ad-35065e477605.jpg?v=1742416402&width=800`, dest: 'images/products/duffle-bag.jpg' },
  { url: `${BASE}/bugattii-black-long-sleeved-sweatshirt-logo.jpg?v=1764246621&width=800`, dest: 'images/products/black-sweatshirt.jpg' },
  { url: `${BASE}/m49_58c8cd9e-616f-48e2-9cca-767f3710c7b0.jpg?v=1742416426&width=800`, dest: 'images/products/bolide-model.jpg' },
  { url: `${BASE}/bugatti-kids-3-piece-baby-set-blue.jpg?v=1764675820&width=800`, dest: 'images/products/kids-baby-set.jpg' },
  { url: `${BASE}/bugatti-kids-winter-jacket-blue.jpg?v=1764680717&width=800`, dest: 'images/products/kids-jacket.jpg' },
  { url: `${BASE}/lego-technic-bugatti-chiron-pur-sport.jpg?v=1773838342&width=800`, dest: 'images/products/lego-chiron.jpg' },
  { url: `${BASE}/a1_66d7f44a-288f-403c-9b33-620031f75651.jpg?v=1742416379&width=800`, dest: 'images/products/product-a1.jpg' },
  { url: `${BASE}/Bugatti-light-blue-logo-cap-25-1339.jpg?v=1764244857&width=800`, dest: 'images/products/light-blue-cap.jpg' },
  { url: `${BASE}/navy-blue-cap-bugatti-logo-25-1339.jpg?v=1764245747&width=800`, dest: 'images/products/navy-cap.jpg' },
  { url: `${BASE}/25-1339-TransparentGlobalLimited0003.jpg?v=1753962283&width=800`, dest: 'images/products/tshirt-0003.jpg' },
  { url: `${BASE}/25-1339-TransparentGlobalLimited0021.jpg?v=1753962227&width=800`, dest: 'images/products/tshirt-0021.jpg' },
  // Custom fonts
  {
    url: 'https://cdn.shopify.com/s/files/1/0887/0726/8955/files/BUGATTIText-Bold.woff2',
    dest: 'fonts/BUGATTIText-Bold.woff2',
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0887/0726/8955/files/BUGATTIText-Regular.woff2',
    dest: 'fonts/BUGATTIText-Regular.woff2',
  },
];

async function download(url, dest) {
  const fullPath = join(PUBLIC, dest);
  await mkdir(dirname(fullPath), { recursive: true });

  if (existsSync(fullPath)) {
    console.log(`  skip (exists): ${dest}`);
    return;
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://bugatti.store/',
      },
    });

    if (!res.ok) {
      console.error(`  FAIL ${res.status}: ${url}`);
      return;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(fullPath, buffer);
    console.log(`  OK (${(buffer.length / 1024).toFixed(0)}KB): ${dest}`);
  } catch (err) {
    console.error(`  ERROR: ${dest} — ${err.message}`);
  }
}

async function downloadAll() {
  console.log(`Downloading ${ASSETS.length} assets to public/\n`);
  const BATCH = 4;
  for (let i = 0; i < ASSETS.length; i += BATCH) {
    const batch = ASSETS.slice(i, i + BATCH);
    await Promise.all(batch.map(({ url, dest }) => download(url, dest)));
  }
  console.log('\nDone.');
}

downloadAll();
