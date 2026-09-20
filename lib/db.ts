import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

// Define structures of Menu Items, Neighborhoods, Orders, and Config
export interface MenuItem {
  id: string;
  name: string;
  category: 'artesanais' | 'tradicionais' | 'churrasco' | 'jantinhas' | 'bebidas' | 'maionese' | 'acrescimos' | 'sobremesas' | 'marmitas';
  price: number;
  description: string;
  image: string;
  hidden?: boolean;
}

export interface Neighborhood {
  name: string;
  rate: number;
}

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  delivery_method: 'entrega' | 'retirada';
  neighborhood: string | null;
  delivery_rate: number;
  complement_info: string;
  payment_method: 'pix' | 'dinheiro';
  cash_change_for: string;
  total: number;
  cart: Record<string, number>;
  observations: Record<string, string>;
  status: 'pendente' | 'preparando' | 'a_caminho' | 'entregue';
  item_extras?: Record<string, Record<string, number>>;
}

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // ARTESANAIS
  {
    id: 'a1',
    name: 'Bacon Grill',
    category: 'artesanais',
    price: 24.00,
    description: 'Pão, blend artesanal, bacon, queijo, alface, tomate, batata palha e maionese especial.',
    image: '/Bacon Grill.jpg'
  },
  {
    id: 'a2',
    name: 'Brasão',
    category: 'artesanais',
    price: 28.00,
    description: 'Pão, blend artesanal, 2 queijos, presunto, cheddar, bacon, ovo, calabresa, cebola roxa, tomate, alface, batata palha, molho barbecue e maionese especial.',
    image: '/Brasao.jpg'
  },
  {
    id: 'a3',
    name: 'Frango-Burguer',
    category: 'artesanais',
    price: 29.00,
    description: 'Pão, blend artesanal, frango grelhado, queijo, presunto, bacon, ovo, tomate, alface, cebola roxa e maionese da casa.',
    image: '/Frango Burguer.jpg'
  },
  {
    id: 'a4',
    name: 'Brutus',
    category: 'artesanais',
    price: 32.00,
    description: 'Pão, 2 blend artesanais, 2 queijos, 2 presuntos, cheddar, bacon, ovo, calabresa, cebola roxa, tomate, alface e molho.',
    image: '/Brutus.jpg'
  },
  {
    id: 'a5',
    name: 'Pernil Prime',
    category: 'artesanais',
    price: 33.00,
    description: 'Pão, blend artesanal, churrasco de pernil, queijo, presunto, bacon, tomate, alface, cebola roxa e maionese.',
    image: '/Pernil Prime.jpg'
  },

  // TRADICIONAIS
  {
    id: 't1',
    name: 'Misto Simples',
    category: 'tradicionais',
    price: 15.00,
    description: 'Pão, 2 queijo, 2 presunto, batata palha, milho e maionese especial.',
    image: '/Misto Simples.jpg'
  },
  {
    id: 't2',
    name: 'Misto Duplo',
    category: 'tradicionais',
    price: 18.00,
    description: 'Pão, 3 queijo, 3 presunto, batata palha, milho e maionese especial.',
    image: '/Misto Dupla.jpg'
  },
  {
    id: 't3',
    name: 'X-Burguer',
    category: 'tradicionais',
    price: 19.00,
    description: 'Pão, bife, queijo, presunto, tomate, alface, batata palha, milho e maionese especial.',
    image: '/X - Burgues.jpg'
  },
  {
    id: 't4',
    name: 'X-Egg-Bacon',
    category: 'tradicionais',
    price: 23.00,
    description: 'Pão, bife, queijo, ovo, bacon, cebola roxa, tomate, alface, batata palha, milho e maionese especial.',
    image: '/X-Egg-Bacon.jpg'
  },
  {
    id: 't5',
    name: 'X-Tudo',
    category: 'tradicionais',
    price: 25.00,
    description: 'Pão, bife, queijo, presunto, ovo, bacon, cebola roxa, tomate, alface, milho, batata palha e maionese especial.',
    image: '/X-Tudo.jpg'
  },
  {
    id: 't6',
    name: 'X-Tudo Especial',
    category: 'tradicionais',
    price: 28.00,
    description: 'Pão, 2 bifes, 2 queijos, bacon, 2 ovos, 2 presuntos, calabresa, tomate, alface, cebola roxa, milho, batata palha e maionese especial.',
    image: '/X-Tudo Especial.jpg'
  },

  // CHURRASCO
  {
    id: 'c1',
    name: 'Espeto de Boi',
    category: 'churrasco',
    price: 10.00,
    description: 'Espetinho de boi grelhado de alta qualidade.',
    image: '/Espeto de boi.jpg'
  },
  {
    id: 'c2',
    name: 'Espeto de Porco',
    category: 'churrasco',
    price: 9.00,
    description: 'Espetinho de porco suculento e saboroso.',
    image: '/Epeto de Porco.jpg'
  },
  {
    id: 'c3',
    name: 'Medalhão de Frango',
    category: 'churrasco',
    price: 12.00,
    description: 'Espetinho de peito de frango enrolado com generoso bacon.',
    image: '/Espeto Medlhao de Frango.jpg'
  },
  {
    id: 'c4',
    name: 'Coraçãozinho',
    category: 'churrasco',
    price: 10.00,
    description: 'Tradicional espetinho de coração de frango bem temperado.',
    image: '/Coraçãozinho.jpg'
  },
  {
    id: 'c5',
    name: 'Meio da Asa',
    category: 'churrasco',
    price: 9.00,
    description: 'Espetito de meio da asa (tulipa) de frango dourada e suculenta.',
    image: '/Meio da asa.jpg'
  },
  {
    id: 'c6',
    name: 'Linguiça',
    category: 'churrasco',
    price: 7.00,
    description: 'Espetinho de linguiça grelhada na brasa.',
    image: '/Churrasco de linguiça.jpg'
  },

  // JANTINHAS
  {
    id: 'j1',
    name: 'Jantinha P',
    category: 'jantinhas',
    price: 16.00,
    description: 'Arroz, vinagrete, salpicão, feijão tropeiro.',
    image: '/Jantinha P.jpg'
  },
  {
    id: 'j2',
    name: 'Jantinha M',
    category: 'jantinhas',
    price: 18.00,
    description: 'Arroz, vinagrete, salpicão, feijão tropeiro.',
    image: '/Jantinha M.jpg'
  },
  {
    id: 'j3',
    name: 'Jantinha + Churrasco de Boi',
    category: 'jantinhas',
    price: 25.00,
    description: 'Arroz, feijão tropeiro, salpicão, vinagrete e churrasco de boi.',
    image: '/jantinha-churrasco-boi.jpg'
  },
  {
    id: 'j4',
    name: 'Jantinha + Coraçãozinho',
    category: 'jantinhas',
    price: 25.00,
    description: 'Arroz, feijão tropeiro, salpicão, vinagrete e churrasco de coraçãozinho.',
    image: '/jantinha-churrasco-coracao.jpg'
  },
  {
    id: 'j5',
    name: 'Jantinha + Medalhão',
    category: 'jantinhas',
    price: 27.00,
    description: 'Arroz, feijão tropeiro, salpicão, vinagrete churrasco de medalhão de frango.',
    image: '/jantinha-medalhao.jpg'
  },

  // BEBIDAS
  {
    id: 'd1',
    name: 'Pepsi 2 Litros',
    category: 'bebidas',
    price: 12.00,
    description: 'Pepsi 2 litros super gelada para acompanhar.',
    image: '/Pepsi 2 litros.jpg'
  },
  {
    id: 'd2',
    name: 'Lata Guaraná Zero',
    category: 'bebidas',
    price: 6.00,
    description: 'Guaraná Antarctica Zero açúcar em lata geladinho.',
    image: '/Lata Guaraná Zero.jpg'
  },
  {
    id: 'd3',
    name: 'Guaraná 1 Litro',
    category: 'bebidas',
    price: 8.00,
    description: 'Refrigerante Guaraná Antarctica garrafa de 1 litro.',
    image: '/Guaraná 1 litro.jpg'
  },
  {
    id: 'd4',
    name: 'Coca 600',
    category: 'bebidas',
    price: 8.00,
    description: 'Garrafa Coca-Cola 600ml gelada.',
    image: '/Coca 600.jpg'
  },
  {
    id: 'd5',
    name: 'Fanta Laranja 2 Litros',
    category: 'bebidas',
    price: 12.00,
    description: 'Refrigerante Fanta Laranja 2 litros.',
    image: '/Fanta laranja 2 litros.jpg'
  },
  {
    id: 'd6',
    name: 'Guaraná 2 Litros',
    category: 'bebidas',
    price: 12.00,
    description: 'Guaraná Antarctica 2 litros estupendamente gelado.',
    image: '/Guaraná 2 litros.jpg'
  },
  {
    id: 'd7',
    name: 'Coca 2 Litros',
    category: 'bebidas',
    price: 15.00,
    description: 'Coca-Cola sabor original garrafa de 2 litros.',
    image: '/Coca 2 litros.jpg'
  },
  {
    id: 'd8',
    name: 'Coca Lata',
    category: 'bebidas',
    price: 6.00,
    description: 'Coca-Cola em lata 350ml trincando de gelada.',
    image: '/Coca lata.jpg'
  },
  {
    id: 'd9',
    name: 'Brahma Latão',
    category: 'bebidas',
    price: 7.00,
    description: 'Cerveja Brahma Pilsen latão 473ml gelada.',
    image: '/Brahma latão.jpg'
  },
  {
    id: 'd10',
    name: 'Energético Monster',
    category: 'bebidas',
    price: 12.00,
    description: 'Monster Energy 473ml lata.',
    image: '/Energético Monster.jpg'
  },
  {
    id: 'd11',
    name: 'Suco Natural Manga',
    category: 'bebidas',
    price: 7.00,
    description: 'Suco 100% natural sabor Manga.',
    image: '/Suco Natural Manga.jpg'
  },
  {
    id: 'd12',
    name: 'Suco Natural Abacaxi c/ Hortelã',
    category: 'bebidas',
    price: 7.00,
    description: 'Suco 100% natural de abacaxi com Hortelã.',
    image: '/Suco Natural Abacaxi com Hortelã.jpg'
  },
  {
    id: 'd13',
    name: 'Suco Natural de Maracujá',
    category: 'bebidas',
    price: 7.00,
    description: 'Suco 100% natural de Maracujá.',
    image: '/Suco natural de Maracujá.jpg'
  },
  {
    id: 'd14',
    name: 'Caçulinha Guaraná',
    category: 'bebidas',
    price: 4.00,
    description: 'Refrigerante Guaraná Caçulinha 237ml.',
    image: '/Caçulinha Guaraná.jpg'
  },
  {
    id: 'd15',
    name: 'Budweiser',
    category: 'bebidas',
    price: 9.00,
    description: 'Cerveja Budweiser longneck.',
    image: '/Budweiser.jpg'
  },
  {
    id: 'd16',
    name: 'Heineken',
    category: 'bebidas',
    price: 9.00,
    description: 'Cerveja Heineken longneck.',
    image: '/Heineken.jpg'
  },

  // MAIONESE
  {
    id: 'm1',
    name: 'Maionese',
    category: 'maionese',
    price: 1.00,
    description: 'Maionese caseira temperada deliciosa.',
    image: '/MAIONESE.jpg'
  },

  // ACRESCIMOS
  {
    id: 'e1',
    name: 'Bacon',
    category: 'acrescimos',
    price: 4.00,
    description: 'Adicional de bacon crocante.',
    image: '/Acréscimo de Bacon.jpg'
  },
  {
    id: 'e2',
    name: 'Cheddar',
    category: 'acrescimos',
    price: 4.00,
    description: 'Adicional de cheddar cremoso.',
    image: '/Acréscimo de Cheddar.jpg'
  },
  {
    id: 'e3',
    name: 'Calabresa',
    category: 'acrescimos',
    price: 4.00,
    description: 'Adicional de calabresa grelhada.',
    image: '/Acréscimo de Calabresa.jpg'
  },
  {
    id: 'e4',
    name: 'Queijo',
    category: 'acrescimos',
    price: 5.00,
    description: 'Adicional de queijo muçarela saboroso.',
    image: '/Acréscimo de queijo.jpg'
  },
  {
    id: 'e5',
    name: 'Bife/Blend de carne',
    category: 'acrescimos',
    price: 6.00,
    description: 'Adicional de bife/blend de carne artesanal.',
    image: '/Bife-Blend de carne.jpg'
  },
  {
    id: 'e6',
    name: 'Bife de hambúrguer',
    category: 'acrescimos',
    price: 4.00,
    description: 'Adicional de bife de hambúrguer tradicional.',
    image: '/Bife de hambúrguer.jpg'
  },

  // SOBREMESAS
  {
    id: 's1',
    name: 'Pudim de Leite Condensado',
    category: 'sobremesas',
    price: 12.00,
    description: 'Pudim cremoso de leite condensado com calda de caramelo.',
    image: '/Pudim.jpg'
  },
  {
    id: 's2',
    name: 'Mousse de Maracujá',
    category: 'sobremesas',
    price: 8.00,
    description: 'Mousse super cremoso de maracujá feito na casa.',
    image: '/Mousse.jpg'
  },

  // MARMITAS
  {
    id: 'item-6401',
    name: 'Marmitex só salpicão',
    category: 'marmitas',
    price: 18.00,
    description: 'Porção generosa de salpicão especial da casa.',
    image: '/Marmitex só salpicão.jpg',
    hidden: false
  },
  {
    id: 'item-5489',
    name: 'Marmitex só tropeiro',
    category: 'marmitas',
    price: 18.00,
    description: 'Tradicional feijão tropeiro completo e saboroso.',
    image: '/Marmitex só tropeiro.jpg',
    hidden: false
  },
  {
    id: 'item-5465',
    name: 'Marmitex só vinagrete',
    category: 'marmitas',
    price: 15.00,
    description: 'Vinagrete fresco temperado no capricho.',
    image: '/Marmitex só vinagrete.jpg',
    hidden: false
  },
  {
    id: 'item-3737',
    name: 'Marmitex só arroz',
    category: 'marmitas',
    price: 12.00,
    description: 'Arroz soltinho e fresquinho.',
    image: '/Marmitex só arroz.jpg',
    hidden: false
  }
];

const DEFAULT_NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Ponte do Silva', rate: 2.00 },
  { name: 'Vila Formosa', rate: 6.00 },
  { name: 'Córrego dos Hott', rate: 6.00 },
  { name: 'Gameleira de Baixo', rate: 6.00 },
  { name: 'Córrego dos Valentim', rate: 5.00 },
  { name: 'Córrego São Francisco', rate: 6.00 },
  { name: 'Córrego do Arrozal', rate: 5.00 },
  { name: 'Córrego da Raiz', rate: 5.00 }
];

// Determine data directory location safely for both Windows and Docker/Linux
export function getDataDirectory(): string {
  const envDir = process.env.DATA_DIR;
  if (envDir) {
    if (process.platform === 'win32' && envDir.startsWith('/') && !fs.existsSync(envDir)) {
      return path.join(process.cwd(), 'data');
    }
    return path.isAbsolute(envDir) ? envDir : path.join(process.cwd(), envDir);
  }
  return path.join(process.cwd(), 'data');
}

// Global Singleton for SQLite Database Connection
let dbInstance: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (dbInstance) return dbInstance;

  const dataDir = getDataDirectory();
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbFilePath = path.join(dataDir, 'brasa.db');
  const db = new Database(dbFilePath);

  // Enable WAL (Write-Ahead Logging) for high concurrency and performance
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // 1. Create SQL Tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      hidden INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS neighborhoods (
      name TEXT PRIMARY KEY,
      rate REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT,
      delivery_method TEXT NOT NULL,
      neighborhood TEXT,
      delivery_rate REAL NOT NULL DEFAULT 0,
      complement_info TEXT,
      payment_method TEXT NOT NULL,
      cash_change_for TEXT,
      total REAL NOT NULL,
      cart TEXT NOT NULL,
      observations TEXT,
      item_extras TEXT,
      status TEXT NOT NULL DEFAULT 'pendente'
    );

    CREATE TABLE IF NOT EXISTS app_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // 2. Data Migration & Seeding from db.json if database is freshly created
  try {
    const itemCountRow = db.prepare('SELECT COUNT(*) as count FROM menu_items').get() as { count: number };
    const jsonPath = path.join(dataDir, 'db.json');

    if (itemCountRow.count === 0) {
      let migratedFromJson = false;

      if (fs.existsSync(jsonPath)) {
        try {
          const raw = fs.readFileSync(jsonPath, 'utf-8');
          const parsed = JSON.parse(raw);

          const insertItem = db.prepare(`
            INSERT OR REPLACE INTO menu_items (id, name, category, price, description, image, hidden)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `);

          const insertNeighborhood = db.prepare(`
            INSERT OR REPLACE INTO neighborhoods (name, rate)
            VALUES (?, ?)
          `);

          const insertOrder = db.prepare(`
            INSERT OR REPLACE INTO orders (
              id, created_at, customer_name, customer_phone, delivery_method,
              neighborhood, delivery_rate, complement_info, payment_method,
              cash_change_for, total, cart, observations, item_extras, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `);

          const migrateTransaction = db.transaction(() => {
            if (Array.isArray(parsed.menuItems)) {
              for (const item of parsed.menuItems) {
                insertItem.run(
                  item.id,
                  item.name,
                  item.category,
                  Number(item.price),
                  item.description || '',
                  item.image || '/Bacon Grill.jpg',
                  item.hidden ? 1 : 0
                );
              }
            }

            if (Array.isArray(parsed.neighborhoods)) {
              for (const n of parsed.neighborhoods) {
                insertNeighborhood.run(n.name.trim(), Number(n.rate));
              }
            }

            if (Array.isArray(parsed.orders)) {
              for (const o of parsed.orders) {
                insertOrder.run(
                  o.id,
                  o.created_at || new Date().toISOString(),
                  o.customer_name || 'Cliente',
                  o.customer_phone || '',
                  o.delivery_method || 'entrega',
                  o.neighborhood || null,
                  Number(o.delivery_rate || 0),
                  o.complement_info || '',
                  o.payment_method || 'pix',
                  o.cash_change_for || '',
                  Number(o.total || 0),
                  typeof o.cart === 'object' ? JSON.stringify(o.cart) : String(o.cart || '{}'),
                  typeof o.observations === 'object' ? JSON.stringify(o.observations) : String(o.observations || '{}'),
                  typeof o.item_extras === 'object' ? JSON.stringify(o.item_extras) : String(o.item_extras || '{}'),
                  o.status || 'pendente'
                );
              }
            }
          });

          migrateTransaction();
          migratedFromJson = true;
          console.log('[SQL Database] Dados migrados com sucesso do db.json para o SQLite!');
        } catch (jsonErr) {
          console.error('[SQL Database] Erro ao importar do db.json, populando com defaults...', jsonErr);
        }
      }

      // If not migrated from JSON, seed default menu items
      if (!migratedFromJson) {
        const insertItem = db.prepare(`
          INSERT OR REPLACE INTO menu_items (id, name, category, price, description, image, hidden)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const seedItemsTx = db.transaction(() => {
          for (const item of DEFAULT_MENU_ITEMS) {
            insertItem.run(
              item.id,
              item.name,
              item.category,
              item.price,
              item.description,
              item.image,
              item.hidden ? 1 : 0
            );
          }
        });
        seedItemsTx();
      }
    }

    // Ensure neighborhoods are populated
    const neighCountRow = db.prepare('SELECT COUNT(*) as count FROM neighborhoods').get() as { count: number };
    if (neighCountRow.count === 0) {
      const insertNeigh = db.prepare('INSERT OR REPLACE INTO neighborhoods (name, rate) VALUES (?, ?)');
      const seedNeighTx = db.transaction(() => {
        for (const n of DEFAULT_NEIGHBORHOODS) {
          insertNeigh.run(n.name, n.rate);
        }
      });
      seedNeighTx();
    }

    // Ensure default app configurations exist in SQL
    const initConfig = db.prepare('INSERT OR IGNORE INTO app_config (key, value) VALUES (?, ?)');
    initConfig.run('whatsappNumber', process.env.WHATSAPP_NUMBER || '5533999404779');
    initConfig.run('pixKey', process.env.PIX_KEY || '60200344000176');
    initConfig.run('deliveryEnabled', 'true');

  } catch (initErr) {
    console.error('[SQL Database] Erro durante inicialização das tabelas/dados:', initErr);
  }

  dbInstance = db;
  return dbInstance;
}

// Backward compatibility helper
export async function initializeDatabase() {
  getDatabase();
  return {
    menuItems: await getMenuItems(),
    neighborhoods: await getNeighborhoods(),
    orders: await getOrders(),
  };
}

// --- MENU ITEMS DATABASE API (SQL) ---

export async function getMenuItems(): Promise<MenuItem[]> {
  const db = getDatabase();
  const rows = db.prepare('SELECT id, name, category, price, description, image, hidden FROM menu_items').all() as any[];
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    category: r.category,
    price: Number(r.price),
    description: r.description || '',
    image: r.image || '/Bacon Grill.jpg',
    hidden: Boolean(r.hidden)
  }));
}

export async function saveMenuItem(item: MenuItem): Promise<MenuItem> {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO menu_items (id, name, category, price, description, image, hidden)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      category = excluded.category,
      price = excluded.price,
      description = excluded.description,
      image = excluded.image,
      hidden = excluded.hidden
  `);

  stmt.run(
    item.id,
    item.name,
    item.category,
    Number(item.price),
    item.description || '',
    item.image || '/Bacon Grill.jpg',
    item.hidden ? 1 : 0
  );

  return item;
}

export async function updateMenuItem(item: Partial<MenuItem> & { id: string }): Promise<MenuItem> {
  const db = getDatabase();
  const existing = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(item.id) as any;
  if (!existing) {
    throw new Error(`Item do cardápio com ID ${item.id} não encontrado.`);
  }

  const updated: MenuItem = {
    id: item.id,
    name: item.name !== undefined ? item.name : existing.name,
    category: item.category !== undefined ? item.category : existing.category,
    price: item.price !== undefined ? Number(item.price) : Number(existing.price),
    description: item.description !== undefined ? item.description : (existing.description || ''),
    image: item.image !== undefined ? item.image : (existing.image || '/Bacon Grill.jpg'),
    hidden: item.hidden !== undefined ? item.hidden : Boolean(existing.hidden),
  };

  await saveMenuItem(updated);
  return updated;
}

// --- NEIGHBORHOODS DATABASE API (SQL) ---

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  const db = getDatabase();
  const rows = db.prepare('SELECT name, rate FROM neighborhoods ORDER BY name ASC').all() as any[];
  return rows.map(r => ({
    name: r.name,
    rate: Number(r.rate)
  }));
}

export async function saveNeighborhood(neighborhood: Neighborhood): Promise<Neighborhood> {
  const db = getDatabase();
  const cleanName = neighborhood.name.trim();
  const cleanRate = Number(neighborhood.rate);

  const stmt = db.prepare(`
    INSERT INTO neighborhoods (name, rate)
    VALUES (?, ?)
    ON CONFLICT(name) DO UPDATE SET rate = excluded.rate
  `);

  stmt.run(cleanName, cleanRate);
  return { name: cleanName, rate: cleanRate };
}

export async function updateNeighborhood(name: string, rate: number): Promise<Neighborhood> {
  return saveNeighborhood({ name, rate });
}

export async function deleteNeighborhood(name: string): Promise<boolean> {
  const db = getDatabase();
  const cleanName = name.trim().toLowerCase();
  const stmt = db.prepare('DELETE FROM neighborhoods WHERE LOWER(TRIM(name)) = ?');
  const result = stmt.run(cleanName);
  return result.changes > 0;
}

// --- ORDERS DATABASE API (SQL) ---

export async function getOrders(): Promise<Order[]> {
  const db = getDatabase();
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all() as any[];

  return rows.map(r => ({
    id: r.id,
    created_at: r.created_at,
    customer_name: r.customer_name,
    customer_phone: r.customer_phone || '',
    delivery_method: r.delivery_method as 'entrega' | 'retirada',
    neighborhood: r.neighborhood || null,
    delivery_rate: Number(r.delivery_rate || 0),
    complement_info: r.complement_info || '',
    payment_method: r.payment_method as 'pix' | 'dinheiro',
    cash_change_for: r.cash_change_for || '',
    total: Number(r.total || 0),
    cart: r.cart ? (typeof r.cart === 'string' ? JSON.parse(r.cart) : r.cart) : {},
    observations: r.observations ? (typeof r.observations === 'string' ? JSON.parse(r.observations) : r.observations) : {},
    item_extras: r.item_extras ? (typeof r.item_extras === 'string' ? JSON.parse(r.item_extras) : r.item_extras) : {},
    status: r.status as Order['status']
  }));
}

export async function saveOrder(orderData: Omit<Order, 'id' | 'created_at' | 'status'>): Promise<Order> {
  const db = getDatabase();
  const newOrder: Order = {
    ...orderData,
    id: 'ord_' + Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    status: 'pendente'
  };

  const stmt = db.prepare(`
    INSERT INTO orders (
      id, created_at, customer_name, customer_phone, delivery_method,
      neighborhood, delivery_rate, complement_info, payment_method,
      cash_change_for, total, cart, observations, item_extras, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    newOrder.id,
    newOrder.created_at,
    newOrder.customer_name,
    newOrder.customer_phone || '',
    newOrder.delivery_method,
    newOrder.neighborhood,
    Number(newOrder.delivery_rate || 0),
    newOrder.complement_info || '',
    newOrder.payment_method,
    newOrder.cash_change_for || '',
    Number(newOrder.total || 0),
    JSON.stringify(newOrder.cart || {}),
    JSON.stringify(newOrder.observations || {}),
    JSON.stringify(newOrder.item_extras || {}),
    newOrder.status
  );

  return newOrder;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
  const db = getDatabase();
  const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
  const result = stmt.run(status, id);

  if (result.changes === 0) {
    throw new Error(`Pedido com ID ${id} não encontrado.`);
  }

  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;
  return {
    id: row.id,
    created_at: row.created_at,
    customer_name: row.customer_name,
    customer_phone: row.customer_phone || '',
    delivery_method: row.delivery_method,
    neighborhood: row.neighborhood || null,
    delivery_rate: Number(row.delivery_rate || 0),
    complement_info: row.complement_info || '',
    payment_method: row.payment_method,
    cash_change_for: row.cash_change_for || '',
    total: Number(row.total || 0),
    cart: row.cart ? JSON.parse(row.cart) : {},
    observations: row.observations ? JSON.parse(row.observations) : {},
    item_extras: row.item_extras ? JSON.parse(row.item_extras) : {},
    status: row.status
  };
}

export async function deleteOrder(id: string): Promise<boolean> {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM orders WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export async function deleteOrders(ids: string[]): Promise<boolean> {
  if (ids.length === 0) return true;
  const db = getDatabase();
  const placeholders = ids.map(() => '?').join(',');
  const stmt = db.prepare(`DELETE FROM orders WHERE id IN (${placeholders})`);
  const result = stmt.run(...ids);
  return result.changes > 0;
}

export async function deleteAllOrders(): Promise<boolean> {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM orders');
  stmt.run();
  return true;
}

// --- APP CONFIGURATION API (SQL) ---

export async function getConfig(key: string, defaultValue: string = ''): Promise<string> {
  const db = getDatabase();
  const row = db.prepare('SELECT value FROM app_config WHERE key = ?').get(key) as { value: string } | undefined;
  return row ? row.value : defaultValue;
}

export async function saveConfig(key: string, value: string): Promise<void> {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO app_config (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  stmt.run(key, value);
}

export async function getAllConfig(): Promise<{ whatsappNumber: string; pixKey: string; deliveryEnabled: boolean }> {
  const db = getDatabase();
  const rows = db.prepare('SELECT key, value FROM app_config').all() as { key: string; value: string }[];
  const map: Record<string, string> = {};
  for (const r of rows) {
    map[r.key] = r.value;
  }

  return {
    whatsappNumber: map.whatsappNumber || process.env.WHATSAPP_NUMBER || '5533999404779',
    pixKey: map.pixKey || process.env.PIX_KEY || '60200344000176',
    deliveryEnabled: map.deliveryEnabled !== undefined ? map.deliveryEnabled === 'true' : true,
  };
}
