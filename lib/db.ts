import fs from 'fs';
import path from 'path';

// Define structures of Menu Items, Neighborhoods, and Orders
export interface MenuItem {
  id: string;
  name: string;
  category: 'artesanais' | 'tradicionais' | 'churrasco' | 'jantinhas' | 'bebidas' | 'maionese' | 'acrescimos' | 'sobremesas';
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

interface DatabaseSchema {
  menuItems: MenuItem[];
  neighborhoods: Neighborhood[];
  orders: Order[];
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

// Determine DB file location
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

// Memory cache to avoid synchronous disk reads on every request
let dbCache: DatabaseSchema | null = null;
let initPromise: Promise<DatabaseSchema> | null = null;

export async function initializeDatabase(): Promise<DatabaseSchema> {
  if (dbCache) return dbCache;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // Ensure the directory exists
      if (!fs.existsSync(DATA_DIR)) {
        await fs.promises.mkdir(DATA_DIR, { recursive: true });
      }

      // Check if file exists
      if (fs.existsSync(DB_PATH)) {
        const fileContent = await fs.promises.readFile(DB_PATH, 'utf-8');
        try {
          const parsed = JSON.parse(fileContent) as DatabaseSchema;
          // Ensure structure correctness
          dbCache = {
            menuItems: parsed.menuItems || [],
            neighborhoods: parsed.neighborhoods || [],
            orders: parsed.orders || [],
          };
          return dbCache;
        } catch (parseErr) {
          console.error('Failed to parse db.json, recreating...', parseErr);
        }
      }

      // File does not exist or is corrupt, initialize with defaults
      const initialData: DatabaseSchema = {
        menuItems: DEFAULT_MENU_ITEMS,
        neighborhoods: DEFAULT_NEIGHBORHOODS,
        orders: [],
      };
      await writeDatabaseAtomic(initialData);
      dbCache = initialData;
      return dbCache;
    } catch (err) {
      console.error('Database initialization failed:', err);
      // Fallback in-memory database to prevent app crashes
      dbCache = {
        menuItems: DEFAULT_MENU_ITEMS,
        neighborhoods: DEFAULT_NEIGHBORHOODS,
        orders: [],
      };
      return dbCache;
    }
  })();

  return initPromise;
}

// Atomic write to avoid file corruption
async function writeDatabaseAtomic(data: DatabaseSchema): Promise<void> {
  const tempPath = DB_PATH + '.tmp';
  const serialized = JSON.stringify(data, null, 2);
  
  // Ensure the directory exists just in case
  if (!fs.existsSync(DATA_DIR)) {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
  }

  await fs.promises.writeFile(tempPath, serialized, 'utf-8');
  await fs.promises.rename(tempPath, DB_PATH);
}

// QUEUE to prevent concurrent write collisions (write-locking)
let writeQueue: Promise<void> = Promise.resolve();

async function executeInQueue<T>(operation: () => Promise<T>): Promise<T> {
  const currentQueue = writeQueue;
  let resolvePromise: () => void;
  writeQueue = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  await currentQueue;
  try {
    return await operation();
  } finally {
    resolvePromise!();
  }
}

// --- MENU ITEMS DATABASE API ---

export async function getMenuItems(): Promise<MenuItem[]> {
  const db = await initializeDatabase();
  return db.menuItems;
}

export async function saveMenuItem(item: MenuItem): Promise<MenuItem> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    
    // Check if item exists
    const index = db.menuItems.findIndex(m => m.id === item.id);
    if (index !== -1) {
      db.menuItems[index] = { ...db.menuItems[index], ...item };
    } else {
      db.menuItems.push(item);
    }
    
    await writeDatabaseAtomic(db);
    return item;
  });
}

export async function updateMenuItem(item: Partial<MenuItem> & { id: string }): Promise<MenuItem> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    const index = db.menuItems.findIndex(m => m.id === item.id);
    if (index === -1) {
      throw new Error(`Item do cardápio com ID ${item.id} não encontrado.`);
    }
    db.menuItems[index] = { ...db.menuItems[index], ...item };
    await writeDatabaseAtomic(db);
    return db.menuItems[index];
  });
}

// --- NEIGHBORHOODS DATABASE API ---

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  const db = await initializeDatabase();
  return db.neighborhoods;
}

export async function saveNeighborhood(neighborhood: Neighborhood): Promise<Neighborhood> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    const index = db.neighborhoods.findIndex(n => n.name.toLowerCase() === neighborhood.name.toLowerCase());
    if (index !== -1) {
      db.neighborhoods[index] = neighborhood;
    } else {
      db.neighborhoods.push(neighborhood);
    }
    await writeDatabaseAtomic(db);
    return neighborhood;
  });
}

export async function updateNeighborhood(name: string, rate: number): Promise<Neighborhood> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    const index = db.neighborhoods.findIndex(n => n.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
      throw new Error(`Bairro com o nome ${name} não encontrado.`);
    }
    db.neighborhoods[index].rate = rate;
    await writeDatabaseAtomic(db);
    return db.neighborhoods[index];
  });
}

export async function deleteNeighborhood(name: string): Promise<boolean> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    const originalLength = db.neighborhoods.length;
    db.neighborhoods = db.neighborhoods.filter(n => n.name.toLowerCase() !== name.toLowerCase());
    if (db.neighborhoods.length === originalLength) {
      return false;
    }
    await writeDatabaseAtomic(db);
    return true;
  });
}

// --- ORDERS DATABASE API ---

export async function getOrders(): Promise<Order[]> {
  const db = await initializeDatabase();
  // Return orders sorted by created_at desc
  return [...db.orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function saveOrder(orderData: Omit<Order, 'id' | 'created_at' | 'status'>): Promise<Order> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    
    const newOrder: Order = {
      ...orderData,
      id: 'ord_' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      status: 'pendente'
    };
    
    db.orders.push(newOrder);
    await writeDatabaseAtomic(db);
    return newOrder;
  });
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    const index = db.orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error(`Pedido com ID ${id} não encontrado.`);
    }
    db.orders[index].status = status;
    await writeDatabaseAtomic(db);
    return db.orders[index];
  });
}

export async function deleteOrder(id: string): Promise<boolean> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    const originalLength = db.orders.length;
    db.orders = db.orders.filter(o => o.id !== id);
    if (db.orders.length === originalLength) {
      return false;
    }
    await writeDatabaseAtomic(db);
    return true;
  });
}

export async function deleteOrders(ids: string[]): Promise<boolean> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    const originalLength = db.orders.length;
    db.orders = db.orders.filter(o => !ids.includes(o.id));
    if (db.orders.length === originalLength) {
      return false;
    }
    await writeDatabaseAtomic(db);
    return true;
  });
}

export async function deleteAllOrders(): Promise<boolean> {
  return executeInQueue(async () => {
    const db = await initializeDatabase();
    db.orders = [];
    await writeDatabaseAtomic(db);
    return true;
  });
}

