'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  ShoppingBag, 
  MapPin, 
  Bike, 
  Store, 
  ArrowLeft, 
  Plus, 
  Minus, 
  DollarSign, 
  Check, 
  Copy, 
  ChevronRight, 
  Info,
  QrCode,
  CheckCircle2,
  Phone,
  User,
  MapPinOff,
  Sparkles,
  MessageSquare,
  Lock,
  Unlock,
  Settings,
  Eye,
  EyeOff,
  Edit,
  TrendingUp,
  BarChart3,
  PlusCircle,
  Trash2,
  LogOut,
  RefreshCw,
  FileText,
  Printer,
  Calendar,
  Award,
  AlertTriangle,
  Lightbulb,
  Download,
  PieChart,
  PackageCheck,
  TrendingDown,
  Filter,
  X
} from 'lucide-react';

// Define structures of Menu Items
interface MenuItem {
  id: string;
  name: string;
  category: 'artesanais' | 'tradicionais' | 'churrasco' | 'jantinhas' | 'bebidas' | 'maionese' | 'acrescimos' | 'sobremesas' | 'marmitas';
  price: number;
  description: string;
  image: string;
  hidden?: boolean;
}

// Pre-programmed items with high quality realistic food images matching the user's catalog
const MENU_ITEMS: MenuItem[] = [
  // ARTESANAIS
  {
    id: 'a1',
    name: 'Bacon Grill',
    category: 'artesanais',
    price: 24.00,
    description: 'PÃ£o, blend artesanal, bacon, queijo, alface, tomate, batata palha e maionese especial.',
    image: '/Bacon Grill.jpg'
  },
  {
    id: 'a2',
    name: 'BrasÃ£o',
    category: 'artesanais',
    price: 28.00,
    description: 'PÃ£o, blend artesanal, 2 queijos, presunto, cheddar, bacon, ovo, calabresa, cebola roxa, tomate, alface, batata palha, molho barbecue e maionese especial.',
    image: '/Brasao.jpg'
  },
  {
    id: 'a3',
    name: 'Frango-Burguer',
    category: 'artesanais',
    price: 29.00,
    description: 'PÃ£o, blend artesanal, frango grelhado, queijo, presunto, bacon, ovo, tomate, alface, cebola roxa e maionese da casa.',
    image: '/Frango Burguer.jpg'
  },
  {
    id: 'a4',
    name: 'Brutus',
    category: 'artesanais',
    price: 32.00,
    description: 'PÃ£o, 2 blend artesanais, 2 queijos, 2 presuntos, cheddar, bacon, ovo, calabresa, cebola roxa, tomate, alface e molho.',
    image: '/Brutus.jpg'
  },
  {
    id: 'a5',
    name: 'Pernil Prime',
    category: 'artesanais',
    price: 33.00,
    description: 'PÃ£o, blend artesanal, churrasco de pernil, queijo, presunto, bacon, tomate, alface, cebola roxa e maionese.',
    image: '/Pernil Prime.jpg'
  },

  // TRADICIONAIS
  {
    id: 't1',
    name: 'Misto Simples',
    category: 'tradicionais',
    price: 15.00,
    description: 'PÃ£o, 2 queijo, 2 presunto, batata palha, milho e maionese especial.',
    image: '/Misto Simples.jpg'
  },
  {
    id: 't2',
    name: 'Misto Duplo',
    category: 'tradicionais',
    price: 18.00,
    description: 'PÃ£o, 3 queijo, 3 presunto, batata palha, milho e maionese especial.',
    image: '/Misto Dupla.jpg'
  },
  {
    id: 't3',
    name: 'X-Burguer',
    category: 'tradicionais',
    price: 19.00,
    description: 'PÃ£o, bife, queijo, presunto, tomate, alface, batata palha, milho e maionese especial.',
    image: '/X - Burgues.jpg'
  },
  {
    id: 't4',
    name: 'X-Egg-Bacon',
    category: 'tradicionais',
    price: 23.00,
    description: 'PÃ£o, bife, queijo, ovo, bacon, cebola roxa, tomate, alface, batata palha, milho e maionese especial.',
    image: '/X-Egg-Bacon.jpg'
  },
  {
    id: 't5',
    name: 'X-Tudo',
    category: 'tradicionais',
    price: 25.00,
    description: 'PÃ£o, bife, queijo, presunto, ovo, bacon, cebola roxa, tomate, alface, milho, batata palha e maionese especial.',
    image: '/X-Tudo.jpg'
  },
  {
    id: 't6',
    name: 'X-Tudo Especial',
    category: 'tradicionais',
    price: 28.00,
    description: 'PÃ£o, 2 bifes, 2 queijos, bacon, 2 ovos, 2 presuntos, calabresa, tomate, alface, cebola roxa, milho, batata palha e maionese especial.',
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
    name: 'MedalhÃ£o de Frango',
    category: 'churrasco',
    price: 12.00,
    description: 'Espetinho de peito de frango enrolado com generoso bacon.',
    image: '/Espeto Medlhao de Frango.jpg'
  },
  {
    id: 'c4',
    name: 'CoraÃ§Ã£ozinho',
    category: 'churrasco',
    price: 10.00,
    description: 'Tradicional espetinho de coraÃ§Ã£o de frango bem temperado.',
    image: '/CoraÃ§Ã£ozinho.jpg'
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
    name: 'LinguiÃ§a',
    category: 'churrasco',
    price: 7.00,
    description: 'Espetinho de linguiÃ§a grelhada na brasa.',
    image: '/Churrasco de linguiÃ§a.jpg'
  },

  // JANTINHAS
  {
    id: 'j1',
    name: 'Jantinha P',
    category: 'jantinhas',
    price: 16.00,
    description: 'Arroz, vinagrete, salpicÃ£o, feijÃ£o tropeiro.',
    image: '/Jantinha P.jpg'
  },
  {
    id: 'j2',
    name: 'Jantinha M',
    category: 'jantinhas',
    price: 18.00,
    description: 'Arroz, vinagrete, salpicÃ£o, feijÃ£o tropeiro.',
    image: '/Jantinha M.jpg'
  },
  {
    id: 'j3',
    name: 'Jantinha + Churrasco de Boi',
    category: 'jantinhas',
    price: 25.00,
    description: 'Arroz, feijÃ£o tropeiro, salpicÃ£o, vinagrete e churrasco de boi.',
    image: '/jantinha-churrasco-boi.jpg'
  },
  {
    id: 'j4',
    name: 'Jantinha + CoraÃ§Ã£ozinho',
    category: 'jantinhas',
    price: 25.00,
    description: 'Arroz, feijÃ£o tropeiro, salpicÃ£o, vinagrete e churrasco de coraÃ§Ã£ozinho.',
    image: '/jantinha-churrasco-coracao.jpg'
  },
  {
    id: 'j5',
    name: 'Jantinha + MedalhÃ£o',
    category: 'jantinhas',
    price: 27.00,
    description: 'Arroz, feijÃ£o tropeiro, salpicÃ£o, vinagrete churrasco de medalhÃ£o de frango.',
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
    name: 'Lata GuaranÃ¡ Zero',
    category: 'bebidas',
    price: 6.00,
    description: 'GuaranÃ¡ Antarctica Zero aÃ§Ãºcar em lata geladinho.',
    image: '/Lata GuaranÃ¡ Zero.jpg'
  },
  {
    id: 'd3',
    name: 'GuaranÃ¡ 1 Litro',
    category: 'bebidas',
    price: 8.00,
    description: 'Refrigerante GuaranÃ¡ Antarctica garrafa de 1 litro.',
    image: '/GuaranÃ¡ 1 litro.jpg'
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
    name: 'GuaranÃ¡ 2 Litros',
    category: 'bebidas',
    price: 12.00,
    description: 'GuaranÃ¡ Antarctica 2 litros estupendamente gelado.',
    image: '/GuaranÃ¡ 2 litros.jpg'
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
    name: 'Brahma LatÃ£o',
    category: 'bebidas',
    price: 7.00,
    description: 'Cerveja Brahma Pilsen latÃ£o 473ml gelada.',
    image: '/Brahma latÃ£o.jpg'
  },
  {
    id: 'd10',
    name: 'EnergÃ©tico Monster',
    category: 'bebidas',
    price: 12.00,
    description: 'Monster Energy 473ml lata.',
    image: '/EnergÃ©tico Monster.jpg'
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
    name: 'Suco Natural Abacaxi c/ HortelÃ£',
    category: 'bebidas',
    price: 7.00,
    description: 'Suco 100% natural de abacaxi com HortelÃ£.',
    image: '/Suco Natural Abacaxi com HortelÃ£.jpg'
  },
  {
    id: 'd13',
    name: 'Suco Natural de MaracujÃ¡',
    category: 'bebidas',
    price: 7.00,
    description: 'Suco 100% natural de MaracujÃ¡.',
    image: '/Suco natural de MaracujÃ¡.jpg'
  },
  {
    id: 'd14',
    name: 'CaÃ§ulinha GuaranÃ¡',
    category: 'bebidas',
    price: 4.00,
    description: 'Refrigerante GuaranÃ¡ CaÃ§ulinha 237ml.',
    image: '/CaÃ§ulinha GuaranÃ¡.jpg'
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
    image: '/AcrÃ©scimo de Bacon.jpg'
  },
  {
    id: 'e2',
    name: 'Cheddar',
    category: 'acrescimos',
    price: 4.00,
    description: 'Adicional de cheddar cremoso.',
    image: '/AcrÃ©scimo de Cheddar.jpg'
  },
  {
    id: 'e3',
    name: 'Calabresa',
    category: 'acrescimos',
    price: 4.00,
    description: 'Adicional de calabresa grelhada.',
    image: '/AcrÃ©scimo de Calabresa.jpg'
  },
  {
    id: 'e4',
    name: 'Queijo',
    category: 'acrescimos',
    price: 5.00,
    description: 'Adicional de queijo muÃ§arela saboroso.',
    image: '/AcrÃ©scimo de queijo.jpg'
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
    name: 'Bife de hambÃºrguer',
    category: 'acrescimos',
    price: 4.00,
    description: 'Adicional de bife de hambúrguer tradicional.',
    image: '/Bife de hambúrguer.jpg'
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

// Pre-programmed delivery neighborhoods (bairros) of Brasa Burguer
interface Neighborhood {
  name: string;
  rate: number;
}

const PRE_PROGRAMMED_NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Ponte do Silva', rate: 2.00 },
  { name: 'Vila Formosa', rate: 6.00 },
  { name: 'Córrego dos Hott', rate: 6.00 },
  { name: 'Gameleira de Baixo', rate: 6.00 },
  { name: 'Córrego dos Valentim', rate: 5.00 },
  { name: 'Córrego São Francisco', rate: 6.00 },
  { name: 'Córrego do Arrozal', rate: 5.00 },
  { name: 'Córrego da Raiz', rate: 5.00 }
];

export default function Home() {
  // Navigation Steps
  // 0: Boas-vindas (Welcome, choose Pickup/Delivery)
  // 1: Locais de Entrega (If delivery chosen)
  // 2: CardÃ¡pio do Dia (Items list, quantities adjustments)
  // 3: Resumo & Pagamento (Pix or Cash)
  // 4: Pedido Enviado (Active live status tracker & Whatsapp share)
  const [step, setStep] = useState<number>(0);
  
  // Form and Cart States
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<'entrega' | 'retirada' | null>(null);
  
  // Step 2 Address details (for Delivery)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [complementInfo, setComplementInfo] = useState<string>('');

  // Step 3 Cart state (item.id -> quantity)
  const [cart, setCart] = useState<{ [itemId: string]: number }>({});
  const [itemExtras, setItemExtras] = useState<{ [itemId: string]: { [extraId: string]: number } }>({});
  const [activeCategory, setActiveCategory] = useState<'all' | 'artesanais' | 'tradicionais' | 'churrasco' | 'jantinhas' | 'bebidas' | 'maionese' | 'acrescimos' | 'sobremesas' | 'marmitas'>('all');
  const [observations, setObservations] = useState<{ [itemId: string]: string }>({});

  const updateItemExtra = (itemId: string, extraId: string, amount: number) => {
    setItemExtras(prev => {
      const itemExtrasMap = prev[itemId] || {};
      const newQty = (itemExtrasMap[extraId] || 0) + amount;
      const updatedItemExtrasMap = { ...itemExtrasMap };
      if (newQty <= 0) {
        delete updatedItemExtrasMap[extraId];
      } else {
        updatedItemExtrasMap[extraId] = newQty;
      }
      return {
        ...prev,
        [itemId]: updatedItemExtrasMap
      };
    });
  };

  // Step 4 Checkout state
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'dinheiro' | null>(null);
  const [cashChangeFor, setCashChangeFor] = useState<string>('');
  const [pixCopied, setPixCopied] = useState<boolean>(false);

  // Step 5 Live Progress simulation
  const [orderProgress, setOrderProgress] = useState<number>(1);

  // Dynamic menu items & neighborhoods synchronized with Supabase database
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>(PRE_PROGRAMMED_NEIGHBORHOODS);
  const [expandedItem, setExpandedItem] = useState<MenuItem | null>(null);

  // Admin Area states
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');
  const [adminTab, setAdminTab] = useState<'sales' | 'items' | 'neighborhoods' | 'config'>('sales');

  // Admin datasets & CRUD states
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isSavingItem, setIsSavingItem] = useState<boolean>(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [isCreatingNewItem, setIsCreatingNewItem] = useState<boolean>(false);
  const [newItemForm, setNewItemForm] = useState<Partial<MenuItem>>({
    id: '',
    name: '',
    category: 'artesanais',
    price: 0,
    description: '',
    image: '/Bacon Grill.jpg'
  });

  const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null);
  const [editingNeighborhoodRate, setEditingNeighborhoodRate] = useState<string>('');
  const [newNeighborhoodName, setNewNeighborhoodName] = useState('');
  const [newNeighborhoodRate, setNewNeighborhoodRate] = useState('');
  const [isNeighborhoodLoading, setIsNeighborhoodLoading] = useState(false);
  const [neighborhoodMessage, setNeighborhoodMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [orderIdToConfirmDelete, setOrderIdToConfirmDelete] = useState<string | null>(null);

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [isConfirmingBulkDelete, setIsConfirmingBulkDelete] = useState<boolean>(false);
  const [salesReportTab, setSalesReportTab] = useState<'dashboard' | 'markdown' | 'orders'>('dashboard');
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  // Period / Date filter states
  const [periodFilter, setPeriodFilter] = useState<'all' | 'today' | 'yesterday' | '7days' | '30days' | 'specific' | 'custom'>('all');
  const [selectedSpecificDate, setSelectedSpecificDate] = useState<string>(''); // 'DD/MM/YYYY'
  const [customStartDate, setCustomStartDate] = useState<string>(''); // 'YYYY-MM-DD'
  const [customEndDate, setCustomEndDate] = useState<string>(''); // 'YYYY-MM-DD'

  // Helper date functions
  const getLocalIsoDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayOfWeekName = (d: Date) => {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return days[d.getDay()] || '';
  };

  // Complete daily breakdown across ALL orders (unfiltered) to allow viewing and separating values by day
  const allDailyStats = useMemo(() => {
    if (!adminOrders || adminOrders.length === 0) return [];
    const map: Record<string, {
      date: string;
      isoDate: string;
      dayOfWeek: string;
      revenue: number;
      ordersCount: number;
      itemsCount: number;
      deliveryFees: number;
      timestamp: number;
    }> = {};

    adminOrders.forEach(o => {
      const d = new Date(o.created_at);
      if (isNaN(d.getTime())) return;
      const dateStr = d.toLocaleDateString('pt-BR');
      const iso = getLocalIsoDate(d);
      const dayOfWeek = getDayOfWeekName(d);

      if (!map[dateStr]) {
        map[dateStr] = {
          date: dateStr,
          isoDate: iso,
          dayOfWeek,
          revenue: 0,
          ordersCount: 0,
          itemsCount: 0,
          deliveryFees: 0,
          timestamp: new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
        };
      }

      map[dateStr].revenue += Number(o.total || 0);
      map[dateStr].ordersCount += 1;
      map[dateStr].deliveryFees += Number(o.delivery_rate || 0);

      if (o.cart && typeof o.cart === 'object') {
        Object.values(o.cart).forEach(q => {
          map[dateStr].itemsCount += Number(q) || 0;
        });
      }
      if (o.item_extras && typeof o.item_extras === 'object') {
        Object.values(o.item_extras).forEach(extras => {
          if (extras && typeof extras === 'object') {
            Object.values(extras).forEach(eq => {
              map[dateStr].itemsCount += Number(eq) || 0;
            });
          }
        });
      }
    });

    const list = Object.values(map).map(day => ({
      ...day,
      ticketMedio: day.ordersCount > 0 ? day.revenue / day.ordersCount : 0
    }));

    // Sort descending by date (most recent first)
    list.sort((a, b) => b.timestamp - a.timestamp);
    return list;
  }, [adminOrders]);

  // Filtered orders according to selected date or period
  const filteredAdminOrders = useMemo(() => {
    if (periodFilter === 'all') return adminOrders;
    const now = new Date();
    const todayIso = getLocalIsoDate(now);
    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(now.getDate() - 1);
    const yesterdayIso = getLocalIsoDate(yesterdayDate);

    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime();
    const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).getTime();

    return adminOrders.filter(o => {
      const d = new Date(o.created_at);
      if (isNaN(d.getTime())) return false;
      const dStr = d.toLocaleDateString('pt-BR');
      const dIso = getLocalIsoDate(d);
      const orderDayTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

      if (periodFilter === 'specific') {
        return dStr === selectedSpecificDate;
      }
      if (periodFilter === 'today') {
        return dIso === todayIso;
      }
      if (periodFilter === 'yesterday') {
        return dIso === yesterdayIso;
      }
      if (periodFilter === '7days') {
        return orderDayTime >= sevenDaysAgo;
      }
      if (periodFilter === '30days') {
        return orderDayTime >= thirtyDaysAgo;
      }
      if (periodFilter === 'custom') {
        if (customStartDate && dIso < customStartDate) return false;
        if (customEndDate && dIso > customEndDate) return false;
        return true;
      }
      return true;
    });
  }, [adminOrders, periodFilter, selectedSpecificDate, customStartDate, customEndDate]);

  // Computed Sales Analytics and Business Intelligence (respecting the active date/period filter)
  const salesAnalytics = useMemo(() => {
    if (!filteredAdminOrders || filteredAdminOrders.length === 0) {
      let emptyPeriodLabel = 'Nenhum pedido';
      if (periodFilter === 'specific' && selectedSpecificDate) {
        emptyPeriodLabel = `Dia ${selectedSpecificDate} (0 pedidos)`;
      } else if (periodFilter === 'today') {
        emptyPeriodLabel = 'Hoje (0 pedidos)';
      } else if (periodFilter === 'yesterday') {
        emptyPeriodLabel = 'Ontem (0 pedidos)';
      } else if (periodFilter === '7days') {
        emptyPeriodLabel = 'Últimos 7 dias (0 pedidos)';
      } else if (periodFilter === '30days') {
        emptyPeriodLabel = 'Últimos 30 dias (0 pedidos)';
      } else if (periodFilter === 'custom') {
        emptyPeriodLabel = 'Período customizado (0 pedidos)';
      }

      return {
        totalRevenue: 0,
        totalOrders: 0,
        totalItemsSold: 0,
        ticketMedio: 0,
        totalDeliveryFees: 0,
        firstDate: null,
        lastDate: null,
        periodFormatted: emptyPeriodLabel,
        topProducts: [] as { name: string; category: string; price: number; qty: number; revenue: number; sharePercentage: number }[],
        lowTurnProducts: [] as MenuItem[],
        unsoldTotalCount: menuItems.length,
        top5RevenueShare: 0,
        dailyBreakdown: [] as { date: string; revenue: number; ordersCount: number }[],
        peakDay: null as { date: string; revenue: number; ordersCount: number } | null,
        trend: 'Sem registros no período selecionado',
        pixCount: 0,
        cashCount: 0,
        deliveryCount: 0,
        pickupCount: 0
      };
    }

    const totalRevenue = filteredAdminOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    const totalDeliveryFees = filteredAdminOrders.reduce((sum, o) => sum + Number(o.delivery_rate || 0), 0);
    const totalOrders = filteredAdminOrders.length;
    const ticketMedio = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Period calculation
    const validDates = filteredAdminOrders
      .map(o => new Date(o.created_at))
      .filter(d => !isNaN(d.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());

    const firstDate = validDates[0] || null;
    const lastDate = validDates[validDates.length - 1] || null;

    let periodFormatted = 'Período não identificado';
    if (periodFilter === 'specific' && selectedSpecificDate) {
      const dayStat = allDailyStats.find(s => s.date === selectedSpecificDate);
      periodFormatted = `${selectedSpecificDate}${dayStat?.dayOfWeek ? ` · ${dayStat.dayOfWeek}` : ''}`;
    } else if (periodFilter === 'today') {
      periodFormatted = `Hoje (${new Date().toLocaleDateString('pt-BR')})`;
    } else if (periodFilter === 'yesterday') {
      const yd = new Date();
      yd.setDate(yd.getDate() - 1);
      periodFormatted = `Ontem (${yd.toLocaleDateString('pt-BR')})`;
    } else if (periodFilter === '7days') {
      periodFormatted = 'Últimos 7 dias';
    } else if (periodFilter === '30days') {
      periodFormatted = 'Últimos 30 dias';
    } else if (periodFilter === 'custom') {
      const s = customStartDate ? new Date(customStartDate + 'T12:00:00').toLocaleDateString('pt-BR') : 'Início';
      const e = customEndDate ? new Date(customEndDate + 'T12:00:00').toLocaleDateString('pt-BR') : 'Hoje';
      periodFormatted = `${s} a ${e}`;
    } else {
      periodFormatted = firstDate && lastDate
        ? `${firstDate.toLocaleDateString('pt-BR')} a ${lastDate.toLocaleDateString('pt-BR')}`
        : 'Histórico Completo';
    }

    // Products sales breakdown (Cart + Extras)
    const productStats: { [id: string]: { name: string; category: string; price: number; qty: number; revenue: number } } = {};
    let totalItemsSold = 0;

    filteredAdminOrders.forEach(order => {
      if (order.cart && typeof order.cart === 'object') {
        Object.entries(order.cart).forEach(([itemId, qty]) => {
          const q = Number(qty) || 0;
          totalItemsSold += q;
          const item = menuItems.find(m => m.id === itemId);
          const name = item ? item.name : `Item (${itemId})`;
          const cat = item ? item.category : 'outros';
          const price = item ? item.price : 0;

          if (!productStats[itemId]) {
            productStats[itemId] = { name, category: cat, price, qty: 0, revenue: 0 };
          }
          productStats[itemId].qty += q;
          productStats[itemId].revenue += q * price;
        });
      }

      if (order.item_extras && typeof order.item_extras === 'object') {
        Object.entries(order.item_extras).forEach(([_, extras]) => {
          if (extras && typeof extras === 'object') {
            Object.entries(extras).forEach(([extraId, extraQty]) => {
              const eq = Number(extraQty) || 0;
              totalItemsSold += eq;
              const extraItem = menuItems.find(m => m.id === extraId);
              const extraName = extraItem ? extraItem.name : `Adicional (${extraId})`;
              const extraCat = extraItem ? extraItem.category : 'acrescimos';
              const extraPrice = extraItem ? extraItem.price : 0;

              if (!productStats[extraId]) {
                productStats[extraId] = { name: extraName, category: extraCat, price: extraPrice, qty: 0, revenue: 0 };
              }
              productStats[extraId].qty += eq;
              productStats[extraId].revenue += eq * extraPrice;
            });
          }
        });
      }
    });

    const allSoldProducts = Object.values(productStats);
    const sortedByQtyAndRev = [...allSoldProducts].sort((a, b) => {
      if (b.qty !== a.qty) return b.qty - a.qty;
      return b.revenue - a.revenue;
    });

    const topProducts = sortedByQtyAndRev.slice(0, 5).map(p => ({
      ...p,
      sharePercentage: totalRevenue > 0 ? (p.revenue / totalRevenue) * 100 : 0
    }));

    const top5Revenue = topProducts.reduce((sum, p) => sum + p.revenue, 0);
    const top5RevenueShare = totalRevenue > 0 ? (top5Revenue / totalRevenue) * 100 : 0;

    // Low turn / zero sales products
    const soldIds = new Set(Object.keys(productStats));
    const unsoldMenuItems = menuItems.filter(item => !soldIds.has(item.id));
    const lowTurnProducts = unsoldMenuItems.slice(0, 5);

    // Daily breakdown
    const dailyMap: { [dateStr: string]: { date: string; revenue: number; ordersCount: number } } = {};
    filteredAdminOrders.forEach(o => {
      const dStr = o.created_at ? new Date(o.created_at).toLocaleDateString('pt-BR') : 'Data Indefinida';
      if (!dailyMap[dStr]) {
        dailyMap[dStr] = { date: dStr, revenue: 0, ordersCount: 0 };
      }
      dailyMap[dStr].revenue += Number(o.total || 0);
      dailyMap[dStr].ordersCount += 1;
    });

    const dailyBreakdown = Object.values(dailyMap).sort((a, b) => b.revenue - a.revenue);
    const peakDay = dailyBreakdown[0] || null;

    const trend = filteredAdminOrders.length >= 3 
      ? 'Concentração ativa de vendas no recorte selecionado' 
      : 'Amostragem pontual no período selecionado';

    const pixCount = filteredAdminOrders.filter(o => o.payment_method === 'pix').length;
    const cashCount = filteredAdminOrders.filter(o => o.payment_method === 'dinheiro').length;
    const deliveryCount = filteredAdminOrders.filter(o => o.delivery_method === 'entrega').length;
    const pickupCount = filteredAdminOrders.filter(o => o.delivery_method === 'retirada').length;

    return {
      totalRevenue,
      totalOrders,
      totalItemsSold,
      ticketMedio,
      totalDeliveryFees,
      firstDate,
      lastDate,
      periodFormatted,
      topProducts,
      lowTurnProducts,
      unsoldTotalCount: unsoldMenuItems.length,
      top5RevenueShare,
      dailyBreakdown,
      peakDay,
      trend,
      pixCount,
      cashCount,
      deliveryCount,
      pickupCount
    };
  }, [filteredAdminOrders, menuItems, periodFilter, selectedSpecificDate, customStartDate, customEndDate, allDailyStats]);

  const generateMarkdownReport = () => {
    const {
      totalRevenue,
      totalOrders,
      totalItemsSold,
      ticketMedio,
      totalDeliveryFees,
      periodFormatted,
      topProducts,
      lowTurnProducts,
      top5RevenueShare,
      peakDay,
      pixCount,
      unsoldTotalCount
    } = salesAnalytics;

    return `# Relatório Executivo de Faturamento e Desempenho de Vendas - Brasa Burguer

---

### 1. Visão Geral das Vendas

| Métrica | Valor Consolidado |
| :--- | :--- |
| **Faturamento Total** | **R$ ${totalRevenue.toFixed(2)}** |
| **Volume Total de Itens Vendidos** | **${totalItemsSold} unidades** |
| **Total de Pedidos / Transações** | **${totalOrders} pedidos** |
| **Ticket Médio por Transação** | **R$ ${ticketMedio.toFixed(2)}** |
| **Período Analisado** | **${periodFormatted}** |
| **Taxas de Entrega Coletadas** | **R$ ${totalDeliveryFees.toFixed(2)}** |

---

### 2. Detalhamento por Data (Valores Separados dos Dias)
| Data | Dia da Semana | Qtd. Pedidos | Itens | Taxas de Entrega | Faturamento Total |
| :--- | :---: | :---: | :---: | :---: | :---: |
${allDailyStats.map(d => `| **${d.date}** | ${d.dayOfWeek} | ${d.ordersCount} | ${d.itemsCount} un. | R$ ${d.deliveryFees.toFixed(2)} | **R$ ${d.revenue.toFixed(2)}** |`).join('\n')}

---

### 3. Desempenho de Produtos

#### 🏆 Top 5 Produtos Mais Vendidos (Volume e Faturamento)
| Produto | Categoria | Qtd. Vendida | Faturamento (R$) | % do Faturamento Total |
| :--- | :--- | :---: | :---: | :---: |
${topProducts.map(p => `| **${p.name}** | ${p.category} | **${p.qty} un.** | **R$ ${p.revenue.toFixed(2)}** | **${p.sharePercentage.toFixed(1)}%** |`).join('\n')}

> **Representatividade do Top 5:** Os 5 principais produtos concentram **${top5RevenueShare.toFixed(1)}%** de todo o faturamento da operação no período.

#### ⚠️ Produtos com Menor Desempenho / Baixo Giro (${unsoldTotalCount} itens sem giro)
| Produto / Item | Categoria | Preço Unitário | Status |
| :--- | :--- | :---: | :---: |
${lowTurnProducts.map(p => `| **${p.name}** | ${p.category} | **R$ ${p.price.toFixed(2)}** | **0 vendas no período** |`).join('\n')}

---

### 4. Análise Temporal e Tendências

${peakDay ? `* **Pico de Vendas:** O dia **${peakDay.date}** registrou o maior volume de vendas, totalizando **R$ ${peakDay.revenue.toFixed(2)}** (${totalRevenue > 0 ? ((peakDay.revenue / totalRevenue) * 100).toFixed(1) : 0}% do total) em **${peakDay.ordersCount} pedidos**.` : '* **Pico de Vendas:** Sem registros suficientes no período.'}
* **Tendência Geral:** A operação apresenta concentração de pedidos em dias específicos, apontando forte oportunidade de expansão através de campanhas de recorrência semanal.

---

### 5. Insights e Recomendações de Ação

#### 🟢 Pontos Fortes da Operação
1. **Força da Linha Artesanal:** Alta preferência e valor percebido nos hambúrgueres artesanais.
2. **Ticket Médio Consistente:** Média de **R$ ${ticketMedio.toFixed(2)}** por pedido com combos de bebidas e adicionais.
3. **Adesão a Pagamentos Digitais:** **${totalOrders > 0 ? ((pixCount / totalOrders) * 100).toFixed(0) : 0}%** dos pedidos quitados via PIX, agilizando o fluxo de caixa.

#### 🔴 Gargalos e Oportunidades de Melhoria
1. **Concentração Excessiva de Receita:** Elevada dependência dos lanches do topo.
2. **Cauda Longa Inativa:** ${unsoldTotalCount} produtos do cardápio sem nenhuma saída registrada.
3. **Oscilação no Fluxo Semanal:** Necessidade de nivelamento de demanda nos dias de menor movimento.

#### 🎯 2 Recomendações Estratégicas Práticas
1. **Criação de Combos Promocionais (Cross-Selling):** Montar ofertas casadas (Hambúrguer + Bebida + Sobremesa) para aumentar o giro de categorias paradas.
2. **Campanhas de Ativação no WhatsApp:** Enviar ofertas exclusivas em dias estratégicos para reativar clientes da base.
`;
  };

  const handleDownloadMarkdownReport = () => {
    const md = generateMarkdownReport();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_executivo_brasa_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdownReport = async () => {
    const md = generateMarkdownReport();
    try {
      await navigator.clipboard.writeText(md);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2500);
    } catch (err) {
      console.error('Failed to copy markdown report:', err);
    }
  };

  // Secure dynamic configurations loaded safely on mounted runtime
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('brasa_whatsapp_number') || '5533999404779';
    }
    return '5533999404779';
  });
  const [pixKey, setPixKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('brasa_pix_key') || '60200344000176';
    }
    return '60200344000176';
  });
  const [deliveryEnabled, setDeliveryEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem('brasa_delivery_enabled');
      return val !== null ? val === 'true' : true;
    }
    return true;
  });

  // Admin Actions
  const fetchOrdersForAdmin = async () => {
    setIsLoadingOrders(true);
    try {
      const resp = await fetch('/api/orders');
      if (resp.ok) {
        const data = await resp.json();
        if (data.success && data.orders) {
          setAdminOrders(data.orders);
          setSelectedOrderIds([]);
        }
      }
    } catch (err) {
      console.error('Error loading admin orders:', err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const resp = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const resp = await fetch(`/api/orders?id=${orderId}`, {
        method: 'DELETE',
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          setAdminOrders(prev => prev.filter(o => o.id !== orderId));
          setSelectedOrderIds(prev => prev.filter(id => id !== orderId));
          setOrderIdToConfirmDelete(null);
        } else {
          alert('Erro ao excluir pedido: ' + data.error);
        }
      } else {
        alert('Falha ao excluir pedido no servidor.');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Erro ao tentar excluir o pedido.');
    }
  };

  const handleToggleSelectOrder = (orderId: string) => {
    setSelectedOrderIds(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleToggleSelectAll = () => {
    const currentTargetOrders = periodFilter === 'all' ? adminOrders : filteredAdminOrders;
    if (currentTargetOrders.length > 0 && selectedOrderIds.length === currentTargetOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(currentTargetOrders.map(o => o.id));
    }
  };

  const handleBulkDelete = async () => {
    try {
      const isAll = selectedOrderIds.length === adminOrders.length;
      const url = isAll ? '/api/orders?id=all' : `/api/orders?ids=${selectedOrderIds.join(',')}`;

      const resp = await fetch(url, {
        method: 'DELETE',
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          if (isAll) {
            setAdminOrders([]);
          } else {
            setAdminOrders(prev => prev.filter(o => !selectedOrderIds.includes(o.id)));
          }
          setSelectedOrderIds([]);
          setIsConfirmingBulkDelete(false);
        } else {
          alert('Erro ao excluir pedidos selecionados: ' + data.error);
        }
      } else {
        alert('Falha ao excluir pedidos selecionados no servidor.');
      }
    } catch (err) {
      console.error('Error deleting selected orders:', err);
      alert('Erro ao tentar excluir os pedidos selecionados.');
    }
  };

  const handlePrintOrder = (order: any) => {
    const formatMoney = (val: number) => val.toFixed(2).replace('.', ',');

    const formatRow = (left: string, right: string, targetWidth = 40) => {
      const leftStr = left;
      const rightStr = right.trim();
      const spaceCount = Math.max(2, targetWidth - leftStr.length - rightStr.length);
      return `${leftStr}${' '.repeat(spaceCount)}${rightStr}`;
    };

    const orderDate = new Date(order.created_at);
    const dateStr = orderDate.toLocaleDateString('pt-BR') + ', ' + orderDate.toLocaleTimeString('pt-BR');

    const itemsList: string[] = [];
    Object.entries(order.cart).forEach(([itemId, quantity]) => {
      const item = menuItems.find(m => m.id === itemId);
      if (item) {
        const qty = String(quantity).padStart(2, '0');
        const itemTotal = item.price * (quantity as number);
        let itemBlock = formatRow(`${qty} - ${item.name}`, `R$ ${formatMoney(itemTotal)}`, 40);

        const extras = order.item_extras?.[itemId] || order.itemExtras?.[itemId];
        if (extras) {
          Object.entries(extras).forEach(([extraId, extraQty]) => {
            if ((extraQty as number) > 0) {
              const extraItem = menuItems.find(m => m.id === extraId);
              if (extraItem) {
                const extraTotal = extraItem.price * (extraQty as number);
                const extraQtyPadded = String(extraQty).padStart(2, '0');
                itemBlock += `\n  + ${extraQtyPadded} ${extraItem.name} (+ R$ ${formatMoney(extraTotal)})`;
              }
            }
          });
        }

        const obs = order.observations?.[itemId]?.trim();
        if (item.category !== 'bebidas' && obs) {
          itemBlock += `\n  Obs: ${obs}`;
        }

        itemsList.push(itemBlock);
      }
    });
    const itemsText = itemsList.join('\n\n');

    let clientSection = `Cliente:\n${(order.customer_name || 'Cliente').trim()}`;
    if (order.customer_phone && order.customer_phone.trim()) {
      clientSection += `\n\nContato:\n${order.customer_phone.trim()}`;
    }

    let deliverySection = '';
    if (order.delivery_method === 'entrega') {
      deliverySection = `Entrega:\n${order.neighborhood || 'Não informado'}`;
      if (order.complement_info && order.complement_info.trim()) {
        deliverySection += `\n\nEndereço:\n${order.complement_info.trim()}`;
      }
    } else {
      deliverySection = `Entrega:\nRetirada no Balcão`;
    }

    let paymentText = '';
    if (order.payment_method === 'pix') {
      paymentText = `Pagamento : Pix\nChave Pix : ${pixKey}`;
    } else {
      const enteredValue = parseFloat((order.cash_change_for || '').replace(',', '.'));
      if (!isNaN(enteredValue)) {
        const changeAmount = enteredValue - order.total;
        if (changeAmount >= 0) {
          paymentText = `Pagamento : Dinheiro\nRecebe    : R$ ${formatMoney(enteredValue)}\nTroco     : R$ ${formatMoney(changeAmount)}`;
        } else {
          paymentText = `Pagamento : Dinheiro\nRecebe    : R$ ${formatMoney(enteredValue)}`;
        }
      } else {
        paymentText = `Pagamento : Dinheiro\nTroco     : Sem troco`;
      }
    }

    const receiptText = `   NOVO PEDIDO\n\n${dateStr}\n            \n${clientSection}\n\n${deliverySection}\n----------------------------------------\n\n${itemsText}\n\n----------------------------------------\n\n${paymentText}\n\n========================================\n\n        TOTAL: R$ ${formatMoney(order.total)}\n\n========================================\n\nPedido enviado pelo App\nBrasa Burguer`;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>Imprimir Pedido</title>
            <style>
              @page {
                margin: 0;
                size: 80mm auto;
              }
              body {
                margin: 0;
                padding: 10px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 12px;
                line-height: 1.4;
                color: #000;
                background: #fff;
                white-space: pre-wrap;
                width: 72mm;
              }
            </style>
          </head>
          <body>${receiptText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  };

  const handleToggleItemHidden = async (item: MenuItem) => {
    const updatedHidden = !item.hidden;
    try {
      const resp = await fetch('/api/menu-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, hidden: updatedHidden })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          setMenuItems(prev => prev.map(m => m.id === item.id ? { ...m, hidden: updatedHidden } : m));
        }
      } else {
        // Local state fallback
        setMenuItems(prev => prev.map(m => m.id === item.id ? { ...m, hidden: updatedHidden } : m));
      }
    } catch (err) {
      console.error('Error toggling item visibility:', err);
      setMenuItems(prev => prev.map(m => m.id === item.id ? { ...m, hidden: updatedHidden } : m));
    }
  };

  const handleSaveItemDetails = async (item: MenuItem) => {
    setIsSavingItem(true);
    try {
      const resp = await fetch('/api/menu-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success) {
          setMenuItems(prev => prev.map(m => m.id === item.id ? item : m));
          setEditingItem(null);
        }
      } else {
        setMenuItems(prev => prev.map(m => m.id === item.id ? item : m));
        setEditingItem(null);
      }
    } catch (err) {
      console.error('Error saving item details:', err);
      setMenuItems(prev => prev.map(m => m.id === item.id ? item : m));
      setEditingItem(null);
    } finally {
      setIsSavingItem(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isNewItem: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const resp = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data.success && data.url) {
          if (isNewItem) {
            setNewItemForm({ ...newItemForm, image: data.url });
          } else if (editingItem) {
            setEditingItem({ ...editingItem, image: data.url });
          }
        } else {
          alert('Erro ao fazer upload da imagem: ' + data.error);
        }
      } else {
        alert('Erro ao fazer upload da imagem.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer upload da imagem.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleCreateNewItem = async () => {
    if (!newItemForm.id || !newItemForm.name || newItemForm.price === undefined) return;
    setIsSavingItem(true);
    try {
      const resp = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItemForm)
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success && data.menuItem) {
          setMenuItems(prev => [...prev, data.menuItem]);
          setIsCreatingNewItem(false);
          setNewItemForm({
            id: '',
            name: '',
            category: 'artesanais',
            price: 0,
            description: '',
            image: '/Bacon Grill.jpg'
          });
        }
      } else {
        // Fallback
        const finalItem = { ...newItemForm, hidden: false } as MenuItem;
        setMenuItems(prev => [...prev, finalItem]);
        setIsCreatingNewItem(false);
      }
    } catch (err) {
      console.error('Error creating new item:', err);
      const finalItem = { ...newItemForm, hidden: false } as MenuItem;
      setMenuItems(prev => [...prev, finalItem]);
      setIsCreatingNewItem(false);
    } finally {
      setIsSavingItem(false);
    }
  };

  const handleStartEditNeighborhood = (n: Neighborhood) => {
    setEditingNeighborhood(n);
    setEditingNeighborhoodRate(n.rate.toString());
    setNeighborhoodMessage(null);
  };

  const handleAddNeighborhood = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const name = newNeighborhoodName.trim();
    const rawRate = newNeighborhoodRate.trim().replace(',', '.');

    if (!name) {
      setNeighborhoodMessage({ type: 'error', text: 'Por favor, digite o nome do bairro.' });
      return;
    }
    if (rawRate === '' || isNaN(Number(rawRate)) || Number(rawRate) < 0) {
      setNeighborhoodMessage({ type: 'error', text: 'Por favor, informe uma taxa válida (ex: 5,00 ou 0 para grátis).' });
      return;
    }

    const rate = Number(rawRate);
    setIsNeighborhoodLoading(true);
    setNeighborhoodMessage(null);

    try {
      const resp = await fetch('/api/neighborhoods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rate })
      });
      const data = await resp.json();
      if (resp.ok && data.success && data.neighborhood) {
        setNeighborhoods(prev => {
          const idx = prev.findIndex(item => item.name.trim().toLowerCase() === data.neighborhood.name.trim().toLowerCase());
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = data.neighborhood;
            return updated;
          }
          return [...prev, data.neighborhood];
        });
        setNewNeighborhoodName('');
        setNewNeighborhoodRate('');
        setNeighborhoodMessage({ type: 'success', text: `Bairro "${data.neighborhood.name}" adicionado com sucesso!` });
      } else {
        setNeighborhoodMessage({ type: 'error', text: data.error || 'Erro ao adicionar bairro.' });
      }
    } catch (err: any) {
      console.error(err);
      setNeighborhoodMessage({ type: 'error', text: err.message || 'Erro de conexão ao adicionar bairro.' });
    } finally {
      setIsNeighborhoodLoading(false);
    }
  };

  const handleDeleteNeighborhood = async (name: string) => {
    if (!confirm(`Deseja realmente excluir o bairro "${name}"?`)) return;
    setIsNeighborhoodLoading(true);
    setNeighborhoodMessage(null);
    try {
      const resp = await fetch(`/api/neighborhoods?name=${encodeURIComponent(name.trim())}`, { method: 'DELETE' });
      const data = await resp.json();
      if (resp.ok && data.success) {
        setNeighborhoods(prev => prev.filter(n => n.name.trim().toLowerCase() !== name.trim().toLowerCase()));
        if (selectedNeighborhood?.name.trim().toLowerCase() === name.trim().toLowerCase()) {
          setSelectedNeighborhood(null);
        }
        setNeighborhoodMessage({ type: 'success', text: `Bairro "${name}" excluído com sucesso!` });
      } else {
        setNeighborhoodMessage({ type: 'error', text: data.error || 'Erro ao excluir bairro.' });
      }
    } catch (err: any) {
      console.error(err);
      setNeighborhoodMessage({ type: 'error', text: err.message || 'Erro de conexão ao excluir bairro.' });
    } finally {
      setIsNeighborhoodLoading(false);
    }
  };

  const handleUpdateNeighborhoodRate = async (name: string) => {
    const rawRate = editingNeighborhoodRate.trim().replace(',', '.');
    if (rawRate === '' || isNaN(Number(rawRate)) || Number(rawRate) < 0) {
      setNeighborhoodMessage({ type: 'error', text: 'Por favor, informe uma taxa válida (ex: 5,00 ou 0).' });
      return;
    }

    const rate = Number(rawRate);
    setIsNeighborhoodLoading(true);
    setNeighborhoodMessage(null);

    try {
      const resp = await fetch('/api/neighborhoods', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), rate })
      });
      const data = await resp.json();
      if (resp.ok && data.success && data.neighborhood) {
        setNeighborhoods(prev => prev.map(n => n.name.trim().toLowerCase() === name.trim().toLowerCase() ? data.neighborhood : n));
        setEditingNeighborhood(null);
        setEditingNeighborhoodRate('');
        setNeighborhoodMessage({ type: 'success', text: `Taxa do bairro "${name}" atualizada para R$ ${rate.toFixed(2)}!` });
      } else {
        setNeighborhoodMessage({ type: 'error', text: data.error || 'Erro ao atualizar taxa.' });
      }
    } catch (err: any) {
      console.error('Error updating neighborhood rate:', err);
      setNeighborhoodMessage({ type: 'error', text: err.message || 'Erro de conexão ao atualizar taxa.' });
    } finally {
      setIsNeighborhoodLoading(false);
    }
  };

  const handleSaveConfig = async (wNumber: string, pKey: string, dEnabled: boolean) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('brasa_whatsapp_number', wNumber);
        localStorage.setItem('brasa_pix_key', pKey);
        localStorage.setItem('brasa_delivery_enabled', String(dEnabled));
      }
      setWhatsappNumber(wNumber);
      setPixKey(pKey);
      setDeliveryEnabled(dEnabled);

      const resp = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsappNumber: wNumber, pixKey: pKey, deliveryEnabled: dEnabled })
      });
      if (resp.ok) {
        alert('ConfiguraÃ§Ãµes atualizadas com sucesso!');
      } else {
        alert('ConfiguraÃ§Ãµes salvas localmente!');
      }
    } catch (err) {
      console.error('Error saving config:', err);
      alert('ConfiguraÃ§Ãµes salvas localmente!');
    }
  };

  // Snapshot states to enable automatic cart clearance (finalizing) upon order submit
  const [completedOrder, setCompletedOrder] = useState<{
    customerName: string;
    deliveryMethod: 'entrega' | 'retirada' | null;
    selectedNeighborhood: Neighborhood | null;
    complementInfo: string;
    totalAmount: number;
    paymentMethod?: 'pix' | 'dinheiro' | null;
  } | null>(null);
  const [lastWhatsAppText, setLastWhatsAppText] = useState<string>('');

  // Hydrate configurations & sync datasets securely on component mount
  useEffect(() => {
    const fetchConfigAndDatabase = async () => {
      try {
        // 1. Fetch WhatsApp and Pix config
        const configResp = await fetch('/api/config');
        if (configResp.ok) {
          const data = await configResp.json();
          if (data.whatsappNumber) {
            setWhatsappNumber(data.whatsappNumber);
            localStorage.setItem('brasa_whatsapp_number', data.whatsappNumber);
          }
          if (data.pixKey) {
            setPixKey(data.pixKey);
            localStorage.setItem('brasa_pix_key', data.pixKey);
          }
          if (typeof data.deliveryEnabled === 'boolean') {
            setDeliveryEnabled(data.deliveryEnabled);
            localStorage.setItem('brasa_delivery_enabled', String(data.deliveryEnabled));
          }
        }
      } catch (error) {
        console.error('Failed to load secure dynamic config:', error);
      }

      try {
        // 2. Sync all menu items from Supabase
        const menuResp = await fetch('/api/menu-items');
        if (menuResp.ok) {
          const menuData = await menuResp.json();
          if (menuData.success && menuData.menuItems) {
            setMenuItems(menuData.menuItems);
          }
        }
      } catch (error) {
        console.error('Failed to sync menu items from Supabase:', error);
      }

      try {
        // 3. Sync delivery neighborhoods status from Supabase
        const neighborhoodsResp = await fetch('/api/neighborhoods');
        if (neighborhoodsResp.ok) {
          const neighData = await neighborhoodsResp.json();
          if (neighData.success && neighData.neighborhoods) {
            setNeighborhoods(neighData.neighborhoods);
          }
        }
      } catch (error) {
        console.error('Failed to sync neighborhoods from Supabase:', error);
      }
    };
    fetchConfigAndDatabase();
  }, []);

  // Compute location form validity dynamically based on other states to avoid side-effect errors
  const isLocationFormValid = deliveryMethod === 'entrega' 
    ? (selectedNeighborhood !== null)
    : true;

  // Calculate cart subtotal
  const calculateSubtotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(m => m.id === itemId);
      let itemTotal = item ? item.price * quantity : 0;
      const extras = itemExtras[itemId];
      if (extras) {
        Object.entries(extras).forEach(([extraId, extraQty]) => {
          const extraItem = menuItems.find(m => m.id === extraId);
          if (extraItem) {
            itemTotal += extraItem.price * extraQty;
          }
        });
      }
      return total + itemTotal;
    }, 0);
  };

  // Get current rate
  const getDeliveryRate = () => {
    return deliveryMethod === 'entrega' && selectedNeighborhood ? selectedNeighborhood.rate : 0;
  };

  // Simulate active progress changes once in Success Screen
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 4) {
      interval = setInterval(() => {
        setOrderProgress(prev => {
          if (prev < 4) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 10000); // Progresses status every 10 seconds to make it interactive and fun
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step]);

  // Handle Cart Updates
  const updateCartQuantity = (id: string, amount: number) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + amount;
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[id];
        setItemExtras(prevExtras => {
          const updatedExtras = { ...prevExtras };
          delete updatedExtras[id];
          return updatedExtras;
        });
        setObservations(prevObs => {
          const updatedObs = { ...prevObs };
          delete updatedObs[id];
          return updatedObs;
        });
      } else {
        updated[id] = newQty;
      }
      return updated;
    });
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  };

  // Build the WhatsApp message and redirect
  const sendOrderToWhatsApp = async () => {
    let finalEncodedText = '';

    if (lastWhatsAppText) {
      finalEncodedText = encodeURIComponent(lastWhatsAppText);
    } else {
      const subtotal = calculateSubtotal();
      const deliveryRate = getDeliveryRate();
      const total = subtotal + deliveryRate;

      // Persist order details to Supabase database asynchronously
      try {
        fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName,
            customerPhone,
            deliveryMethod,
            neighborhoodName: selectedNeighborhood?.name || null,
            deliveryRate,
            complementInfo,
            paymentMethod,
            cashChangeFor,
            total,
            cart,
            itemExtras,
            observations,
          }),
        }).catch(err => console.error('Silent background Supabase failure:', err));
      } catch (dbError) {
        console.error('Failed to post order to Supabase API proxy:', dbError);
      }

      const formatMoney = (val: number) => val.toFixed(2).replace('.', ',');

      // Helper para alinhar colunas perfeitamente para bobina/impressão 80mm (Epson T20)
      const formatRow = (left: string, right: string, targetWidth = 40) => {
        const leftStr = left;
        const rightStr = right.trim();
        const spaceCount = Math.max(2, targetWidth - leftStr.length - rightStr.length);
        return `${leftStr}${' '.repeat(spaceCount)}${rightStr}`;
      };

      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR') + ', ' + now.toLocaleTimeString('pt-BR');

      const itemsList: string[] = [];
      Object.entries(cart).forEach(([itemId, quantity]) => {
        const item = menuItems.find(m => m.id === itemId);
        if (item) {
          const qty = String(quantity).padStart(2, '0');
          const itemTotal = item.price * quantity;
          let itemBlock = formatRow(`${qty} - ${item.name}`, `R$ ${formatMoney(itemTotal)}`, 40);

          const extras = itemExtras[itemId];
          if (extras) {
            Object.entries(extras).forEach(([extraId, extraQty]) => {
              if (extraQty > 0) {
                const extraItem = menuItems.find(m => m.id === extraId);
                if (extraItem) {
                  const extraTotal = extraItem.price * extraQty;
                  const extraQtyPadded = String(extraQty).padStart(2, '0');
                  itemBlock += `\n  + ${extraQtyPadded} ${extraItem.name} (+ R$ ${formatMoney(extraTotal)})`;
                }
              }
            });
          }

          const obs = observations[itemId]?.trim();
          if (item.category !== 'bebidas' && obs) {
            itemBlock += `\n  Obs: ${obs}`;
          }

          itemsList.push(itemBlock);
        }
      });
      const itemsText = itemsList.join('\n\n');

      let clientSection = `Cliente:\n${customerName.trim() || 'Cliente'}`;
      if (customerPhone && customerPhone.trim()) {
        clientSection += `\n\nContato:\n${customerPhone.trim()}`;
      }

      let deliverySection = '';
      if (deliveryMethod === 'entrega') {
        deliverySection = `Entrega:\n${selectedNeighborhood?.name || 'Não informado'}`;
        if (complementInfo && complementInfo.trim()) {
          deliverySection += `\n\nEndereço:\n${complementInfo.trim()}`;
        }
      } else {
        deliverySection = `Entrega:\nRetirada no Balcão`;
      }

      let paymentText = '';
      if (paymentMethod === 'pix') {
        paymentText = `Pagamento : Pix\nChave Pix : ${pixKey}`;
      } else {
        const enteredValue = parseFloat(cashChangeFor.replace(',', '.'));
        if (!isNaN(enteredValue)) {
          const changeAmount = enteredValue - total;
          if (changeAmount >= 0) {
            paymentText = `Pagamento : Dinheiro\nRecebe    : R$ ${formatMoney(enteredValue)}\nTroco     : R$ ${formatMoney(changeAmount)}`;
          } else {
            paymentText = `Pagamento : Dinheiro\nRecebe    : R$ ${formatMoney(enteredValue)}`;
          }
        } else {
          paymentText = `Pagamento : Dinheiro\nTroco     : Sem troco`;
        }
      }

      const text = `   NOVO PEDIDO\n\n${dateStr}\n            \n${clientSection}\n\n${deliverySection}\n----------------------------------------\n\n${itemsText}\n\n----------------------------------------\n\n${paymentText}\n\n========================================\n\n        TOTAL: R$ ${formatMoney(total)}\n\n========================================\n\nPedido enviado pelo App\nBrasa Burguer`;

      setLastWhatsAppText(text);
      finalEncodedText = encodeURIComponent(text);

      // Snapshot order details so they remain perfectly visible on success screen
      setCompletedOrder({
        customerName,
        deliveryMethod,
        selectedNeighborhood,
        complementInfo,
        totalAmount: total,
        paymentMethod,
      });

      // Clear the active cart and comments to automatically conclude and finalize the session
      setCart({});
      setItemExtras({});
      setObservations({});
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${finalEncodedText}`, '_blank');
  };

  // Robust Copy Pix Key with visual feedback and mobile fallback
  const handleCopyPixKey = () => {
    if (typeof window !== 'undefined' && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(pixKey).then(() => {
        setPixCopied(true);
        setTimeout(() => setPixCopied(false), 2500);
      }).catch(() => {
        fallbackCopyText(pixKey);
      });
    } else {
      fallbackCopyText(pixKey);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2500);
    } catch (e) {
      console.error('Fallback copy error:', e);
    }
  };

  // Custom step titles/progress
  const getStepProgressWidth = () => {
    if (step === 4) return '100%';
    return `${(step / 3) * 100}%`;
  };

  return (
    <div className="relative min-h-dvh bg-[#FDFBF7] flex flex-col justify-center items-center p-0 sm:py-10 sm:px-4 selection:bg-[#8B4513] selection:text-white overflow-x-hidden" id="app-container">
      {/* Decorative Warm Natural Organic Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[300px] bg-gradient-radial from-[#D2691E]/10 via-[#8B4513]/5 to-transparent blur-3xl pointer-events-none rounded-full" id="ember-glow-effect" />

      {/* Main App Container with beautiful 8px organic borders and Natural Tones casing adapted cleanly for mobile */}
      <div className="w-full max-w-md bg-white border-0 sm:border-8 border-[#E5E0D8] rounded-none sm:rounded-[2.5rem] shadow-none sm:shadow-xl flex flex-col h-dvh sm:h-[85vh] sm:min-h-[720px] sm:max-h-[880px] overflow-hidden relative text-[#4A3728]" id="mobile-shell">
        
        {/* Dynamic Navigation Progress Bar */}
        {step < 4 && (
          <div className="w-full h-1.5 bg-[#E5E0D8]/60 relative" id="app-progress-bar-container">
            <div 
              className="h-full bg-gradient-to-r from-[#D2691E] to-[#8B4513] transition-all duration-500 ease-out"
              style={{ width: getStepProgressWidth() }}
              id="app-progress-fill"
            />
          </div>
        )}

        {/* Global Floating Header */}
        <header className="px-6 py-2 border-b border-[#E5E0D8] bg-white/95 backdrop-blur-md flex items-center justify-between z-10 text-[#4A3728]" id="app-header">
          {step > 0 && step < 4 ? (
            <button 
              onClick={() => {
                if (step === 2 && deliveryMethod === 'retirada') {
                  setStep(0); // Skip neighborhood search screen directly back to welcome
                } else {
                  setStep(prev => prev - 1);
                }
              }} 
              className="p-2 -ml-2 rounded-xl bg-[#F5F2ED] hover:bg-[#EAF1EA]/70 text-[#8C7E6D] hover:text-[#4A3728] transition-colors flex items-center justify-center border border-[#E5E0D8]/40"
              title="Voltar"
              id="back-button"
            >
              <ArrowLeft className="w-4 h-4 mr-1 text-[#8B4513]" />
              <span className="text-xs font-semibold">Voltar</span>
            </button>
          ) : (
            <div className="flex items-center gap-2.5" id="brand-logo-container">
              <span className="bg-[#8B4513] p-2.5 rounded-xl text-white shadow-md flex items-center justify-center animate-pulse" id="brand-badge-flame">
                <Flame className="w-5 h-5" />
              </span>
              <div>
                <h1 className="font-serif font-bold text-xl tracking-tight text-[#8B4513] flex items-center" id="brand-main-title">
                  Brasa Burguer
                </h1>
                <p className="text-[10px] text-[#8C7E6D] uppercase tracking-widest font-semibold" id="brand-tagline">Delivery & Takeout</p>
              </div>
            </div>
          )}

          {/* Inline active indicator for checkout steps */}
          {step < 4 && (
            <div className="flex items-center gap-2" id="header-status-indicator">
              {deliveryMethod && (
                <span className="text-xs bg-[#F5F2ED] text-[#4A3728] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#E5E0D8]" id="delivery-badge">
                  {deliveryMethod === 'entrega' ? (
                    <>
                      <Bike className="w-3.5 h-3.5 text-[#D2691E]" />
                      Entrega
                    </>
                  ) : (
                    <>
                      <Store className="w-3.5 h-3.5 text-[#8B4513]" />
                      Retirada
                    </>
                  )}
                </span>
              )}
              {getCartCount() > 0 && step !== 2 && (
                <span className="bg-[#8B4513] text-white rounded-full text-[10px] font-bold w-5 h-5 flex items-center justify-center shadow-md" id="cart-counter">
                  {getCartCount()}
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowAdminModal(true)}
                className="p-1.5 rounded-xl bg-[#F5F2ED] hover:bg-[#EAF1EA] text-[#8C7E6D] hover:text-[#8B4513] transition-all border border-[#E5E0D8]/40 flex items-center justify-center cursor-pointer"
                title="Painel Administrativo"
                id="admin-gear-button"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          )}
        </header>

        {/* Dynamic Wizard Body wrapper with robust scrolling */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col" id="wizard-body">
          <AnimatePresence mode="wait">
            
            {/* STEP 0: WELCOME & DELIVERY METHOD */}
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 flex flex-col justify-between flex-1"
                id="step-0-welcome-root"
              >
                <div className="space-y-6 flex-1 flex flex-col justify-center my-auto" id="welcome-content-container">
                  {/* Fire Illustration Banner */}
                  <div className="relative text-center space-y-4 py-3" id="welcome-decor-banner">
                    <div className="mx-auto w-20 h-20 bg-[#D2691E] rounded-full flex items-center justify-center text-white shadow-md" id="welcome-flame-circle">
                      <Flame className="w-10 h-10 stroke-[2] animate-bounce" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-2xl tracking-tight text-[#8B4513]" id="welcome-primary-title">
                        Bem-vindo ao Brasa
                      </h2>
                    </div>
                  </div>

                  {/* Customer Name Input */}
                  <div className="space-y-2 pt-2" id="customer-name-input-section">
                    <label htmlFor="customerName" className="text-xs font-bold text-[#8C7E6D] uppercase tracking-wider block">
                      Qual Ã© o seu nome?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-[#8B4513]/60" />
                      </div>
                      <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Digite seu nome..."
                        className="w-full pl-9 pr-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-[#4A3728] placeholder:text-[#8C7E6D]/50 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] transition-all"
                      />
                    </div>
                  </div>

                  {/* Option Cards for Delivery / Takeout */}
                  <div className="space-y-3 pt-3" id="delivery-options-selection">
                    <p className="text-xs font-bold text-[#8C7E6D] uppercase tracking-wider block" id="label-delivery-method-selection">
                      Como deseja receber seu pedido?
                    </p>
                    <div className="grid grid-cols-2 gap-3" id="delivery-method-grid">
                      {/* Entrega (Delivery) Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (deliveryEnabled) {
                            setDeliveryMethod('entrega');
                          } else {
                            alert('No momento, as entregas em domicÃ­lio estÃ£o desativadas pela administraÃ§Ã£o. Por favor, escolha a opÃ§Ã£o Retirada!');
                          }
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-32 focus:outline-none relative overflow-hidden group ${
                          !deliveryEnabled
                            ? 'bg-gray-100/60 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                            : deliveryMethod === 'entrega'
                              ? 'bg-[#8B4513]/5 border-[#8B4513] text-[#8B4513] shadow-md cursor-pointer'
                              : 'bg-white border-[#E5E0D8] hover:border-[#8C7E6D] text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#FDFBF7] cursor-pointer'
                        }`}
                        id="option-delivery-button"
                      >
                        <Bike className={`w-8 h-8 ${!deliveryEnabled ? 'text-gray-300' : deliveryMethod === 'entrega' ? 'text-[#8B4513] scale-110' : 'text-[#8C7E6D] group-hover:text-[#8B4513]'} transition-all`} />
                        <div>
                          <p className="font-bold text-sm block" id="option-delivery-title">
                            1. Entrega
                          </p>
                          <p className="text-[10px] text-[#8C7E6D] mt-0.5" id="option-delivery-desc">
                            {deliveryEnabled ? 'Receba em casa' : 'Temporariamente indisponÃ­vel'}
                          </p>
                        </div>
                        {deliveryMethod === 'entrega' && deliveryEnabled && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#8B4513] text-white flex items-center justify-center animate-scaleIn" id="checked-badge-delivery">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        {!deliveryEnabled && (
                          <span className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-wider bg-red-100 text-red-600 px-1.5 py-0.5 rounded border border-red-200">
                            OFF
                          </span>
                        )}
                      </button>

                      {/* Retirada (Takeout) Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setDeliveryMethod('retirada');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-32 focus:outline-none relative overflow-hidden group ${
                          deliveryMethod === 'retirada' 
                            ? 'bg-[#8B4513]/5 border-[#8B4513] text-[#8B4513] shadow-md' 
                            : 'bg-white border-[#E5E0D8] hover:border-[#8C7E6D] text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#FDFBF7]'
                        }`}
                        id="option-pickup-button"
                      >
                        <Store className={`w-8 h-8 ${deliveryMethod === 'retirada' ? 'text-[#8B4513] scale-110' : 'text-[#8C7E6D] group-hover:text-[#8B4513]'} transition-all`} />
                        <div>
                          <p className="font-bold text-sm block" id="option-pickup-title">2. Retirada</p>
                          <p className="text-[10px] text-[#8C7E6D] mt-0.5" id="option-pickup-desc">Busque na loja</p>
                        </div>
                        {deliveryMethod === 'retirada' && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#8B4513] text-white flex items-center justify-center animate-scaleIn" id="checked-badge-pickup">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Continue Actions */}
                <div className="pt-4 border-t border-[#E5E0D8] mt-6" id="welcome-actions">
                  <button
                    onClick={() => {
                      if (deliveryMethod === 'entrega') {
                        setStep(1); // Go to preprogrammed delivery locations
                      } else {
                        setStep(2); // Go directly to items list
                      }
                    }}
                    disabled={!customerName.trim() || !deliveryMethod || (deliveryMethod === 'entrega' && !deliveryEnabled)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 tracking-wide transition-all ${
                      customerName.trim() && deliveryMethod && !(deliveryMethod === 'entrega' && !deliveryEnabled)
                        ? 'bg-[#8B4513] hover:bg-[#72380f] text-white shadow-md shadow-[#8B4513]/20 cursor-pointer active:scale-98' 
                        : 'bg-[#F2ECE4] text-[#8C7E6D]/50 cursor-not-allowed border border-[#E5E0D8]/40'
                    }`}
                    id="continue-to-menu-button"
                  >
                    Prosseguir
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 1: PRE-PROGRAMMED LOCATIONS & ADRESS FORM */}
            {step === 1 && deliveryMethod === 'entrega' && (
              <motion.div
                key="locations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 flex flex-col justify-between flex-1 h-full min-h-0"
                id="step-1-locations-root"
              >
                <div className="space-y-4 flex-1 flex flex-col min-h-0" id="location-step-container">
                  {/* Section Title */}
                  <div id="location-header" className="shrink-0">
                    <h2 className="font-serif font-bold text-xl text-[#8B4513] flex items-center gap-2" id="location-title">
                      <MapPin className="w-5 h-5 text-[#8B4513]" />
                      Locais de Entrega Preservados
                    </h2>
                    <p className="text-xs text-[#8C7E6D] mt-1 font-medium" id="location-subtitle">
                      Selecione um dos nossos bairros integrados e digite o endereço.
                    </p>
                  </div>

                  {/* List of Registered Locations */}
                  <div className="space-y-2.5 flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar" id="neighborhoods-list">
                    {neighborhoods.map((neighborhood, index) => {
                      const isSelected = selectedNeighborhood?.name === neighborhood.name;
                      return (
                        <div
                          key={neighborhood.name}
                          className="space-y-2"
                          id={`neighborhood-wrapper-${index}`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedNeighborhood(neighborhood);
                              setComplementInfo('');
                            }}
                            className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                              isSelected 
                                ? 'bg-[#8B4513]/5 border-[#8B4513] text-[#8B4513] shadow-sm' 
                                : 'bg-white border-[#E5E0D8] text-[#4A3728] hover:bg-[#FDFBF7]'
                            }`}
                            id={`neighborhood-item-${index}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                                isSelected ? 'bg-[#8B4513] text-white' : 'bg-[#F2ECE4] text-[#8C7E6D]'
                              }`} id="neighborhood-index">
                                {index + 1}
                              </span>
                              <div>
                                <p className="font-bold text-sm" id={`neighborhood-name-${index}`}>{neighborhood.name}</p>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-[#8B4513] text-white flex items-center justify-center shrink-0 shadow-sm">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </button>

                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-1.5 text-left px-1"
                              id="reference-inline-wrapper"
                            >
                              <label className="block text-xs font-bold text-[#8C7E6D] uppercase tracking-wider" htmlFor="complement-info-field">
                                Ponto de Referência <span className="text-[#8C7E6D] font-normal">(Opcional)</span>
                              </label>
                              <input
                                id="complement-info-field"
                                type="text"
                                placeholder="Ex: Próximo ao mercado, portão azul, etc."
                                value={complementInfo}
                                onChange={(e) => setComplementInfo(e.target.value)}
                                className="w-full h-[37px] px-4 bg-[#FDFBF7] border border-[#8B4513]/30 rounded-xl text-[#4A3728] placeholder:text-[#8C7E6D]/50 focus:outline-none focus:ring-1 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all font-medium text-base sm:text-xs"
                              />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Address Fields aligned at the footer block when selected */}
                </div>

                {/* Continue Actions with footer-aligned Complement input */}
                <div className="pt-4 border-t border-[#E5E0D8] mt-6 flex flex-col gap-3" id="locations-actions">
                  <button
                    onClick={() => {
                      if (isLocationFormValid) {
                        setStep(2); // Move to Menu Card
                      }
                    }}
                    disabled={!isLocationFormValid}
                    className={`w-full h-[43px] px-6 rounded-2xl font-bold flex items-center justify-center gap-2 tracking-wide transition-all ${
                      isLocationFormValid
                        ? 'bg-[#8B4513] hover:bg-[#72380f] text-white shadow-md shadow-[#8B4513]/20 cursor-pointer active:scale-98' 
                        : 'bg-[#F2ECE4] text-[#8C7E6D]/50 cursor-not-allowed border border-[#E5E0D8]/40'
                    }`}
                    id="confirm-location-button"
                  >
                    Confirmar EndereÃ§o e Ir ao CardÃ¡pio
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ITEMS LIST & SELECTION */}
            {step === 2 && (
              <motion.div
                key="menu-items"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col justify-between flex-1 h-full min-h-0"
                id="step-2-items-root"
              >
                {/* Scrollable menu selection area */}
                <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar space-y-6" id="items-scroller">
                  
                  {/* Items Catalog List organized by Categories */}
                  <div className="space-y-6" id="catalog-listing">
                    {(['artesanais', 'tradicionais', 'marmitas', 'maionese', 'churrasco', 'jantinhas', 'bebidas', 'sobremesas'] as const).map((catName) => {
                      const categoryDisplayMap = {
                        artesanais: '🍔 Hambúrgueres Artesanais',
                        tradicionais: '🍔 Hambúrgueres Tradicionais',
                        marmitas: '🍱 Marmitas',
                        sobremesas: '🍰 Sobremesas',
                        churrasco: '🥩 Churrasco na Brasa',
                        jantinhas: '🍛 Jantinhas Caprichadas',
                        bebidas: '🥤 Bebidas & Cervejas',
                        maionese: '🥛 Maionese Caseira',
                        acrescimos: '➕ Adicionais e Acréscimos'
                      };

                      const filteredItems = menuItems.filter(item => item.category === catName && !item.hidden);

                      if (filteredItems.length === 0) return null;

                      return (
                        <div key={catName} className="space-y-3" id={`category-section-${catName}`}>
                          <h2 className="text-xs font-black text-[#8B4513] uppercase tracking-wider bg-[#FDFBF7] py-1 border-b border-[#E5E0D8]/60 sticky top-0 z-10 flex items-center gap-2">
                            {categoryDisplayMap[catName]}
                          </h2>

                          <div className="space-y-3">
                            {filteredItems.map((item) => {
                               const quantityInCart = cart[item.id] || 0;
                               return (
                                 <div 
                                   key={item.id} 
                                   className="bg-white border border-[#E5E0D8] hover:border-[#8C7E6D]/60 p-3 rounded-2xl flex flex-col transition-all relative overflow-hidden shadow-sm"
                                   id={`pizza-item-card-${item.id}`}
                                 >
                                   {/* Clickable Header Area to open expanded modal */}
                                   <div 
                                     onClick={() => setExpandedItem(item)}
                                     className="flex gap-3.5 w-full cursor-pointer group/card"
                                     id={`clickable-item-area-${item.id}`}
                                   >
                                     {/* Product Photo */}
                                     <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#FDFBF7] shrink-0 border border-[#E5E0D8] relative" id={`item0-image-holder-${item.id}`}>
                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       <img 
                                         src={item.image} 
                                         alt={item.name} 
                                         className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300" 
                                         referrerPolicy="no-referrer"
                                         id={`item-img-${item.id}`}
                                       />
                                       <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-[#E5E0D8] text-[9px] font-bold text-[#D2691E]" id="item-price-tag">
                                         R$ {item.price.toFixed(2)}
                                       </div>
                                     </div>
 
                                     {/* Product Info content */}
                                     <div className="flex-1 flex flex-col justify-start min-w-0" id={`info-col-${item.id}`}>
                                       <div className="space-y-1" id="product-meta">
                                         <h3 className="font-serif font-bold text-sm text-[#4A3728] truncate group-hover/card:text-[#8B4513] transition-colors" id={`product-name-${item.id}`}>
                                           {item.name}
                                         </h3>
                                         <p className="text-[11px] text-[#8C7E6D] line-clamp-2 leading-relaxed font-medium" id={`product-desc-${item.id}`}>
                                           {item.description}
                                         </p>
                                         <span className="inline-flex items-center gap-1 text-[10px] text-[#8B4513] font-bold uppercase tracking-wider hover:underline pt-0.5" id="see-more-link">
                                           ðŸ”  Ver descriÃ§Ã£o completa
                                         </span>
                                       </div>
                                     </div>
                                   </div>
 
                                   {/* Controls Bar */}
                                   <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#E5E0D8]/40" id="item-controls-bar">
                                     <span className="font-mono text-xs font-bold text-[#D2691E]" id="item-price-main">
                                       R$ {item.price.toFixed(2)}
                                     </span>
 
                                     {/* Selector controls */}
                                     <div className="flex items-center gap-1 bg-[#F5F2ED] p-1 rounded-xl border border-[#E5E0D8]/50" id="qty-selector">
                                       {quantityInCart > 0 && (
                                         <>
                                           <button 
                                             onClick={() => updateCartQuantity(item.id, -1)}
                                             className="w-7 h-7 rounded-lg hover:bg-[#E5E0D8] text-[#8C7E6D] hover:text-[#4A3728] flex items-center justify-center transition-all focus:outline-none"
                                             title="Diminuir"
                                             id="minus-btn"
                                           >
                                             <Minus className="w-3.5 h-3.5 text-[#8C7E6D]" />
                                           </button>
                                           <span className="w-6 text-center font-mono text-xs font-bold text-[#4A3728]" id="qty-display">
                                             {quantityInCart}
                                           </span>
                                         </>
                                       )}
                                       <button 
                                         onClick={() => updateCartQuantity(item.id, 1)}
                                         className="w-7 h-7 rounded-lg bg-[#8B4513] hover:bg-[#72380f] text-white flex items-center justify-center transition-all focus:outline-none"
                                         title="Adicionar"
                                         id="plus-btn"
                                       >
                                         <Plus className="w-3.5 h-3.5" />
                                       </button>
                                     </div>
                                   </div>

                                  {/* Adicionais / AcrÃ©scimos */}
                                  {quantityInCart > 0 && (item.category === 'artesanais' || item.category === 'tradicionais') && (
                                    <div className="mt-3 pt-3 border-t border-[#E5E0D8]/60 animate-fade-in" id={`extras-container-${item.id}`}>
                                      <div className="flex items-center gap-1.5 text-[10px] font-black text-[#8B4513] uppercase tracking-wider mb-2">
                                        <PlusCircle className="w-3 h-3 text-[#8B4513]" />
                                        <span>Adicionais e AcrÃ©scimos:</span>
                                      </div>
                                      <div className="space-y-2">
                                        {menuItems.filter(m => m.category === 'acrescimos' && !m.hidden).map(extra => {
                                          const extraQty = itemExtras[item.id]?.[extra.id] || 0;
                                          return (
                                            <div key={extra.id} className="flex items-center justify-between bg-[#FDFBF7] border border-[#E5E0D8] p-2 rounded-lg">
                                              <div className="flex items-center gap-2">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={extra.image} alt={extra.name} className="w-8 h-8 rounded-md object-cover border border-[#E5E0D8]" />
                                                <div className="flex flex-col">
                                                  <span className="text-xs font-bold text-[#4A3728]">{extra.name}</span>
                                                  <span className="text-[10px] font-mono text-[#D2691E]">+ R$ {extra.price.toFixed(2)}</span>
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E5E0D8] p-0.5">
                                                <button 
                                                  onClick={(e) => { e.stopPropagation(); updateItemExtra(item.id, extra.id, -1); }}
                                                  className="w-6 h-6 rounded-md hover:bg-[#F5F2ED] text-[#8C7E6D] flex items-center justify-center transition-all disabled:opacity-50"
                                                  disabled={extraQty === 0}
                                                >
                                                  <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-4 text-center font-mono text-[11px] font-bold text-[#4A3728]">{extraQty}</span>
                                                <button 
                                                  onClick={(e) => { e.stopPropagation(); updateItemExtra(item.id, extra.id, 1); }}
                                                  className="w-6 h-6 rounded-md bg-[#8B4513] hover:bg-[#72380f] text-white flex items-center justify-center transition-all"
                                                >
                                                  <Plus className="w-3 h-3" />
                                                </button>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Observation input section at the bottom of the card */}
                                  {quantityInCart > 0 && item.category !== 'bebidas' && (
                                    <div className="mt-3 pt-3 border-t border-[#E5E0D8]/60 animate-fade-in" id={`obs-container-${item.id}`}>
                                      <div className="flex items-center gap-1.5 text-[10px] font-black text-[#8B4513] uppercase tracking-wider mb-1.5">
                                        <MessageSquare className="w-3 h-3 text-[#8B4513]" />
                                        <span>ObservaÃ§Ãµes (ex: sem cebola, ponto, etc):</span>
                                      </div>
                                      <input 
                                        type="text"
                                        placeholder="Caso queira tirar ou adicionar algo..."
                                        value={observations[item.id] || ''}
                                        onChange={(e) => {
                                          setObservations(prev => ({
                                            ...prev,
                                            [item.id]: e.target.value
                                          }));
                                        }}
                                        className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] placeholder:text-[#8C7E6D]/50 focus:outline-none focus:ring-1 focus:ring-[#8B4513] transition-all font-medium"
                                        id={`obs-input-${item.id}`}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
 
                {/* Sticky Subtotal & Bottom Action Bar */}
                <div className="sticky bottom-0 z-20 p-3 border-t border-[#E5E0D8] bg-white/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(74,55,40,0.08)]" id="menu-sticky-checkout-bar">
                  <div className="flex items-center justify-between mb-3 text-sm px-1" id="subtotal-display">
                    <div className="flex items-center gap-1.5" id="cart-item-count-badge">
                      <ShoppingBag className="w-4 h-4 text-[#8B4513]" />
                      <span className="text-[#8C7E6D] font-medium">Total do carrinho:</span>
                      <strong className="text-[#4A3728] font-bold">({getCartCount()} itens)</strong>
                    </div>
                    <span className="font-serif font-black text-base text-[#8B4513]" id="cart-total-price">
                      R$ {calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
 
                  <button
                    onClick={() => {
                      if (getCartCount() > 0) {
                        setStep(3); // Payments review
                      }
                    }}
                    disabled={getCartCount() === 0}
                    className={`w-full py-2.5 px-5 rounded-xl font-bold flex items-center justify-between tracking-wide transition-all ${
                      getCartCount() > 0
                        ? 'bg-[#8B4513] hover:bg-[#72380f] text-white shadow-md shadow-[#8B4513]/20 cursor-pointer active:scale-98' 
                        : 'bg-[#F2ECE4] text-[#8C7E6D]/50 border border-[#E5E0D8]/40 cursor-not-allowed'
                    }`}
                    id="finish-review-button"
                  >
                    <span>Finalizar Pedido</span>
                    <div className="flex items-center gap-1" id="btn-next-action">
                      <span className="text-xs font-mono opacity-90 mr-1">R$ {(calculateSubtotal() + getDeliveryRate()).toFixed(2)}</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PAYMENT REVIEW & PURCHASES SUMMARY */}
            {step === 3 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 flex flex-col justify-between flex-1 overflow-y-auto"
                id="step-3-payments-root"
              >
                <div className="space-y-6 flex-1" id="payment-stage-container">
                  {/* Headline */}
                  <div id="payment-header">
                    <h2 className="font-serif font-bold text-xl text-[#8B4513] flex items-center gap-2" id="payment-title">
                      <ShoppingBag className="w-5 h-5 text-[#8B4513]" />
                      Resumo da Compra
                    </h2>
                    <p className="text-xs text-[#8C7E6D] mt-1 font-medium" id="payment-subtitle">
                      Confira todos os itens antes de selecionar a forma de pagamento.
                    </p>
                  </div>

                  {/* Mini-Cart list review */}
                  <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E5E0D8] space-y-3" id="payment-cart-review bg-block">
                    <h3 className="text-xs font-mono uppercase text-[#8C7E6D] tracking-wider flex items-center justify-between pb-2 border-b border-[#E5E0D8] font-bold" id="summary-section-label">
                      <span>Produtos Escolhidos</span>
                      <span>Qtd</span>
                    </h3>
                    <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar" id="summary-ordered-list">
                      {Object.entries(cart).map(([itemId, qty]) => {
                        const item = menuItems.find(m => m.id === itemId);
                        if (!item) return null;
                        
                        let itemSubtotal = item.price * qty;
                        const extras = itemExtras[itemId];
                        let extrasElements: React.ReactNode[] = [];
                        if (extras) {
                          Object.entries(extras).forEach(([extraId, extraQty]) => {
                            if (extraQty > 0) {
                              const extraItem = menuItems.find(m => m.id === extraId);
                              if (extraItem) {
                                itemSubtotal += extraItem.price * extraQty;
                                extrasElements.push(
                                  <p key={extraId} className="text-[10px] text-[#D2691E] font-medium" id={`summary-item-extra-${extraId}`}>
                                    â†³ âž• {extraQty}x {extraItem.name} (+ R$ {(extraItem.price * extraQty).toFixed(2)})
                                  </p>
                                );
                              }
                            }
                          });
                        }

                        return (
                          <div key={item.id} className="flex justify-between items-start text-xs border-b border-[#E5E0D8]/40 pb-2 last:border-0 last:pb-0" id={`summary-item-${item.id}`}>
                            <div className="min-w-0 pr-3" id="summary-item-title-meta">
                              <p className="font-bold text-[#4A3728] truncate" id="summary-item-name">{item.name}</p>
                              {extrasElements}
                              {item.category !== 'bebidas' && observations[item.id]?.trim() && (
                                <p className="text-[10px] text-[#8B4513] font-medium italic mt-0.5" id={`summary-item-obs-${item.id}`}>
                                  â†³ Obs: {observations[item.id].trim()}
                                </p>
                              )}
                              <p className="text-[10px] text-[#8C7E6D] mt-0.5" id="summary-item-un-price">R$ {item.price.toFixed(2)} / un</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-mono text-[#8C7E6D] font-semibold" id="summary-item-count">{qty}x</span>
                              <span className="font-mono font-bold text-[#4A3728] text-right w-16" id="summary-item-subtotal">R$ {itemSubtotal.toFixed(2)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Numerical Math Breakdown */}
                    <div className="border-t border-[#E5E0D8] pt-3 space-y-2 text-xs" id="value-subtotal-breakdowns">
                      {/* Individual delivery fee hidden as requested, but included in the Total Geral */}

                      <div className="flex justify-between text-[#4A3728] font-bold text-sm pt-2" id="breakdown-grandtotal">
                        <span className="text-[#8B4513]">Total Geral:</span>
                        <span className="font-serif text-base text-[#D2691E]">R$ {(calculateSubtotal() + getDeliveryRate()).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Choices */}
                  <div className="space-y-3" id="payment-selector-stage">
                    <p className="text-xs font-bold text-[#8C7E6D] uppercase tracking-wider block" id="payment-selector-label">
                      Forma de Pagamento Integrada:
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3" id="payment-options-grid">
                      {/* Pix Card Option */}
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('pix');
                          setCashChangeFor(''); // reset cash change state
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-28 focus:outline-none relative overflow-hidden group ${
                          paymentMethod === 'pix' 
                            ? 'bg-[#8B4513]/5 border-[#8B4513] text-[#8B4513]' 
                            : 'bg-white border-[#E5E0D8] text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#FDFBF7]'
                        }`}
                        id="option-pix-payment"
                      >
                        <QrCode className={`w-7 h-7 ${paymentMethod === 'pix' ? 'text-[#8B4513] scale-105' : 'text-[#8C7E6D] group-hover:text-[#8B4513]'} transition-all`} />
                        <div>
                          <p className="font-bold text-xs block" id="option-pix-title">Pix InstantÃ¢neo</p>
                          <p className="text-[9px] text-[#8C7E6D] mt-0.5 font-medium" id="option-pix-desc">AprovaÃ§Ã£o imediata</p>
                        </div>
                        {paymentMethod === 'pix' && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#8B4513] text-white flex items-center justify-center text-[9px] animate-scaleIn" id="checked-pix">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>

                      {/* Cash Card Option */}
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('dinheiro');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-28 focus:outline-none relative overflow-hidden group ${
                          paymentMethod === 'dinheiro' 
                            ? 'bg-[#8B4513]/5 border-[#8B4513] text-[#8B4513]' 
                            : 'bg-white border-[#E5E0D8] text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#FDFBF7]'
                        }`}
                        id="option-cash-payment"
                      >
                        <DollarSign className={`w-7 h-7 ${paymentMethod === 'dinheiro' ? 'text-[#8B4513] scale-105' : 'text-[#8C7E6D] group-hover:text-[#8B4513]'} transition-all`} />
                        <div>
                          <p className="font-bold text-xs block" id="option-cash-title">Dinheiro fÃ­sico</p>
                          <p className="text-[9px] text-[#8C7E6D] mt-0.5 font-medium" id="option-cash-desc">Pague na entrega</p>
                        </div>
                        {paymentMethod === 'dinheiro' && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#8B4513] text-white flex items-center justify-center text-[9px] animate-scaleIn" id="checked-cash">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    </div>

                    {/* Conditional Pix information - OCULTO */}
                    {/* {paymentMethod === 'pix' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#E5E0D8] space-y-2 shadow-inner"
                        id="pix-credentials-holder"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#8B4513]/10 p-1.5 rounded-xl text-[#8B4513]" id="pix-box">
                              <QrCode className="w-4 h-4 stroke-[1.5]" />
                            </div>
                            <span className="text-xs font-bold text-[#4A3728]">
                              Chave Pix (Copia e Cola)
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-[#2E7D32] bg-[#EAF1EA] border border-[#C8E6C9] px-2 py-0.5 rounded-full">
                            Destacado
                          </span>
                        </div>

                        <div className="flex items-center gap-2 bg-white border border-[#E5E0D8] p-2 rounded-xl">
                          <code className="flex-1 font-mono text-xs font-bold text-[#4A3728] truncate px-1 select-all">
                            {pixKey}
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyPixKey}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0 ${
                              pixCopied
                                ? 'bg-[#2E7D32] text-white'
                                : 'bg-[#8B4513] hover:bg-[#72380f] text-white'
                            }`}
                          >
                            {pixCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {pixCopied ? 'Copiado!' : 'Copiar Pix'}
                          </button>
                        </div>
                        <p className="text-xs text-[#4A3728] font-medium pt-1" id="pix-caveat">
                          Copie a chave pix e finalize o pedido antes de pagar.
                        </p>
                      </motion.div>
                    )} */}

                    {/* Conditional Cash change request */}
                    {paymentMethod === 'dinheiro' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E5E0D8] space-y-2.5 shadow-inner"
                        id="cash-credentials-holder"
                      >
                        <div id="cash-instruction-header">
                          <p className="text-xs font-bold text-[#4A3728]">Precisa de troco para o motoboy?</p>
                          <p className="text-[10px] text-[#8C7E6D] mt-0.5 font-semibold">Caso nÃ£o precise, deixe este campo vazio.</p>
                        </div>
                        <div className="flex gap-2" id="change-input-pair">
                          <span className="bg-[#F5F2ED] border border-[#E5E0D8] px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-[#8C7E6D] flex items-center justify-center">R$</span>
                          <input 
                                                            type="text"
                                                            placeholder="Ex: 50.00 / 100.00"
                                                            value={cashChangeFor}
                                                            onChange={(e) => setCashChangeFor(e.target.value)}
                                                            className="flex-1 px-3 py-2.5 rounded-xl bg-white border border-[#E5E0D8] text-[#4A3728] placeholder:text-[#8C7E6D]/40 focus:outline-none focus:ring-1 focus:ring-[#8B4513] font-mono text-base sm:text-xs"
                                                            id="change-for-value-input"
                                                          />
                        </div>
                        {cashChangeFor.trim() !== '' && (() => {
                          const enteredValue = parseFloat(cashChangeFor.replace(',', '.'));
                          if (isNaN(enteredValue)) return null;
                          const grandTotal = calculateSubtotal() + getDeliveryRate();
                          const changeAmount = enteredValue - grandTotal;
                          if (changeAmount >= 0) {
                            return (
                              <motion.p 
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-[#2e7d32] font-semibold mt-1 flex items-center gap-1" 
                                id="change-calculated-success"
                              >
                                ðŸ’µ Seu troco serÃ¡ de: <strong className="font-mono bg-[#E8F5E9] px-1.5 py-0.5 rounded text-[#2e7d32]">R$ {changeAmount.toFixed(2)}</strong>
                              </motion.p>
                            );
                          } else {
                            return (
                              <motion.p 
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-[#d32f2f] font-semibold mt-1 flex items-center gap-1" 
                                id="change-calculated-warning"
                              >
                                âš ï¸  O valor inserido Ã© menor que o total do pedido (<strong className="font-mono">R$ {grandTotal.toFixed(2)}</strong>)
                              </motion.p>
                            );
                          }
                        })()}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Confirmations & WhatsApp Dispatch button */}
                <div className="pt-4 border-t border-[#E5E0D8] mt-6 space-y-3" id="payment-actions">
                  <button
                    onClick={() => {
                      if (paymentMethod) {
                        sendOrderToWhatsApp();
                        // Reset all states and go straight back to welcome screen (step 0) as requested
                        setStep(0);
                        setDeliveryMethod(null);
                        setSelectedNeighborhood(null);
                        setStreetAddress('');
                        setStreetNumber('');
                        setComplementInfo('');
                        setCart({});
                        setPaymentMethod(null);
                        setCashChangeFor('');
                        setCompletedOrder(null);
                        setLastWhatsAppText('');
                        setObservations({});
                        setCustomerName('');
                        setCustomerPhone('');
                        setOrderProgress(1);
                      }
                    }}
                    disabled={!paymentMethod}
                    className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 tracking-wide transition-all ${
                      paymentMethod
                        ? 'bg-[#8B4513] hover:bg-[#72380f] text-white shadow-md shadow-[#8B4513]/20 cursor-pointer active:scale-98' 
                        : 'bg-[#F2ECE4] text-[#8C7E6D]/50 border border-[#E5E0D8]/40 cursor-not-allowed'
                    }`}
                    id="finish-order-button"
                  >
                    Confirmar e Finalizar Pedido
                    <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS, TRACKER & WHATSAPP REDIRECT */}
            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 flex flex-col justify-between flex-1 text-center"
                id="step-4-success-root"
              >
                <div className="space-y-6 flex-1 flex flex-col justify-center my-auto" id="success-state-container">
                  
                  {/* Super Checked Badge */}
                  <div className="space-y-3" id="success-banner">
                    <div className="mx-auto w-16 h-16 bg-[#556B2F]/10 border-2 border-[#556B2F] text-[#556B2F] rounded-full flex items-center justify-center shrink-0" id="success-icon-badge">
                      <Check className="w-9 h-9 stroke-[2.5]" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-2xl text-[#4A3728]" id="success-title">
                        Pedido recebido!
                      </h2>
                      <p className="text-xs text-[#8C7E6D] mt-1.5 max-w-[280px] mx-auto font-medium" id="success-description">
                        Seu pedido estÃ¡ no mural dos nossos parrilleiros! Agora Ã© sÃ³ enviar os detalhes no WhatsApp e acompanhar o status real.
                      </p>
                    </div>
                  </div>

                  {/* Interactive status progress tracker */}
                  <div className="bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl p-4 text-left space-y-4 shadow-sm" id="progress-tracker-card">
                    <p className="text-[11px] font-bold text-[#8C7E6D] uppercase tracking-wider border-b border-[#E5E0D8] pb-2 flex items-center justify-between" id="tracker-label">
                      <span>Status do seu HambÃºrguer</span>
                      <span className="text-[10px] text-[#D2691E] font-mono font-bold animate-pulse">Acompanhando ao vivo</span>
                    </p>

                    <div className="relative pl-6 space-y-5" id="tracker-steps-line">
                      {/* Vertical line connector */}
                      <div className="absolute left-[7px] top-[10px] bottom-[10px] w-[2px] bg-[#E5E0D8]" id="tracker-line">
                        <div 
                          className="w-full bg-gradient-to-b from-[#8B4513] to-[#D2691E] transition-all duration-1000 ease-in-out" 
                          style={{ height: `${((orderProgress - 1) / 3) * 100}%` }}
                          id="tracker-line-fill"
                        />
                      </div>

                      {[
                        { stepIdx: 1, title: 'Pedido Confirmado', timeText: 'Recebido de forma instantÃ¢nea', text: 'Os parrilleiros estÃ£o organizando o braseiro e preparando!' },
                        { stepIdx: 2, title: 'Na Grelha e Brasa Hot', timeText: 'Adicionando sabor defumado real', text: 'Artesanal suculento grelhando nas nossas grelhas!' },
                        { stepIdx: 3, title: 'Pronto ou Despachado', timeText: 'Embalagem tÃ©rmica selada', text: 'A caminho de sua casa ou pronto para retirada no balcÃ£o!' },
                        { stepIdx: 4, title: 'Entregue / ConcluÃ­do', timeText: 'Bom apetite!', text: 'Sabor Brasa Burguer entregue ao cliente!' }
                      ].map((trackItem) => {
                        const isActive = orderProgress >= trackItem.stepIdx;
                        const isCurrent = orderProgress === trackItem.stepIdx;
                        
                        return (
                          <div key={trackItem.stepIdx} className="relative flex items-start gap-3" id={`tracker-step-${trackItem.stepIdx}`}>
                            {/* Marker dot */}
                            <span className={`absolute left-[-23px] top-[2px] w-[16px] h-[16px] rounded-full flex items-center justify-center border-2 transition-all ${
                              isActive 
                                ? 'bg-[#8B4513] border-[#8B4513] text-white' 
                                : 'bg-white border-[#E5E0D8]'
                            }`} id="tracker-dot">
                              {isActive && (
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              )}
                            </span>

                            <div className="min-w-0" id="tracker-item-info">
                              <p className={`text-xs font-bold ${
                                isCurrent ? 'text-[#8B4513]' : isActive ? 'text-[#4A3728]' : 'text-[#8C7E6D]/60'
                              }`} id="tracker-item-title">
                                {trackItem.title}
                              </p>
                              <p className="text-[10px] text-[#8C7E6D] leading-relaxed font-medium" id="tracker-item-desc">
                                {trackItem.text}
                              </p>
                              {isActive && (
                                <p className="text-[9px] text-[#D2691E]/90 font-mono font-medium mt-0.5" id="tracker-item-time">
                                  {trackItem.timeText}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Details Badge */}
                  <div className="bg-white border border-[#E5E0D8] p-4 rounded-xl text-left text-xs space-y-1.5" id="order-summary-box">
                    <p className="text-[#4A3728] font-medium" id="summary-client-name">👤 <strong>Cliente:</strong> {completedOrder ? completedOrder.customerName || 'Cliente Brasa' : customerName || 'Cliente Brasa'}</p>
                    <p className="text-[#4A3728] font-medium" id="summary-client-method">🛵 <strong>Modo:</strong> {(completedOrder ? completedOrder.deliveryMethod : deliveryMethod) === 'entrega' ? 'Entrega em domicílio' : 'Retirada na loja'}</p>
                    {((completedOrder ? completedOrder.deliveryMethod : deliveryMethod) === 'entrega') && (
                      <p className="text-[#4A3728] leading-normal font-medium" id="summary-client-address">📍 <strong>Entrega:</strong> Bairro {completedOrder ? completedOrder.selectedNeighborhood?.name : selectedNeighborhood?.name}{(completedOrder ? completedOrder.complementInfo : complementInfo) ? ` - Complemento: ${completedOrder ? completedOrder.complementInfo : complementInfo}` : ''}</p>
                    )}
                    <p className="text-[#4A3728] font-bold border-t border-[#E5E0D8] pt-2 flex justify-between mt-1" id="summary-client-total">
                      <span>Valor total integral:</span>
                      <span className="text-[#D2691E] font-serif text-sm">R$ {completedOrder ? completedOrder.totalAmount.toFixed(2) : (calculateSubtotal() + getDeliveryRate()).toFixed(2)}</span>
                    </p>
                  </div>

                  {/* Highlighted Pix Copy-Paste Card for Customer */}
                  {(completedOrder?.paymentMethod === 'pix' || paymentMethod === 'pix') && (
                    <div className="bg-[#8B4513]/5 border-2 border-dashed border-[#8B4513]/40 p-4 rounded-2xl text-left space-y-2.5 shadow-sm animate-fadeIn" id="pix-copy-card">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#8B4513] uppercase tracking-wider flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-[#8B4513]" /> Chave Pix para Pagamento
                        </span>
                        <span className="text-[10px] font-bold text-[#2E7D32] bg-[#EAF1EA] border border-[#C8E6C9] px-2 py-0.5 rounded-full">
                          Copia e Cola
                        </span>
                      </div>

                      <p className="text-[11px] text-[#8C7E6D]">
                        Toque no botão abaixo para <strong>copiar apenas a chave Pix</strong> sem precisar copiar o texto todo:
                      </p>

                      <div className="flex items-center gap-2 bg-white border border-[#E5E0D8] p-2 rounded-xl shadow-inner">
                        <code className="flex-1 font-mono text-xs font-black text-[#4A3728] truncate px-1 select-all tracking-wider">
                          {pixKey}
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyPixKey}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0 ${
                            pixCopied
                              ? 'bg-[#2E7D32] text-white'
                              : 'bg-[#8B4513] hover:bg-[#72380f] text-white active:scale-95'
                          }`}
                          id="copy-pix-button"
                        >
                          {pixCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {pixCopied ? 'Chave Copiada!' : 'Copiar Chave Pix'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#8C7E6D] pt-0.5 font-medium">
                        <span>Total do Pix: <strong className="text-[#D2691E] font-mono">R$ {completedOrder ? completedOrder.totalAmount.toFixed(2) : (calculateSubtotal() + getDeliveryRate()).toFixed(2)}</strong></span>
                        <span className="text-[#556B2F] font-bold">✓ Pague e envie o comprovante</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary WhatsApp template dispatch connector */}
                <div className="mt-8 space-y-3" id="success-action-buttons">
                  <button
                    onClick={sendOrderToWhatsApp}
                    className="w-full bg-[#556B2F] hover:bg-[#3d4f22] active:scale-98 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2.5 tracking-wide transition-all shadow-md shadow-[#556B2F]/20 cursor-pointer"
                    id="whatsapp-dispatch-button"
                  >
                    Enviar Pedido no WhatsApp da Brasa
                    <ShoppingBag className="w-5 h-5 shrink-0" />
                  </button>

                  <button
                    onClick={() => {
                      // Reset app state back to welcome stage
                      setStep(0);
                      setDeliveryMethod(null);
                      setSelectedNeighborhood(null);
                      setStreetAddress('');
                      setStreetNumber('');
                      setComplementInfo('');
                      setCart({});
                      setPaymentMethod(null);
                      setCashChangeFor('');
                      setCompletedOrder(null);
                      setLastWhatsAppText('');
                    }}
                    className="w-full bg-[#F5F2ED] hover:bg-[#EAF1EA]/50 text-[#8C7E6D] hover:text-[#4A3728] active:scale-98 py-3 px-6 rounded-2xl font-bold text-xs border border-[#E5E0D8]/40 transition-all cursor-pointer"
                    id="new-order-reset-button"
                  >
                    Fazer um Novo Pedido
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Item Expansion Floating Modal */}
          <AnimatePresence>
            {expandedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedItem(null)} // Click outside to close (back to normal)
                className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col justify-end"
                id="item-expansion-overlay"
              >
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                  className="bg-[#FDFBF7] rounded-t-[2.5rem] border-t border-[#E5E0D8] max-h-[90%] overflow-y-auto flex flex-col shadow-2xl relative"
                  id="item-expansion-card"
                >
                  {/* Top Header */}
                  <div className="p-4 border-b border-[#E5E0D8]/60 flex items-center justify-between bg-white sticky top-0 z-10">
                    <span className="text-[10px] font-black text-[#8B4513] uppercase tracking-wider">
                      Detalhes do Produto
                    </span>
                    <button
                      onClick={() => setExpandedItem(null)}
                      className="p-1.5 rounded-xl bg-[#F5F2ED] hover:bg-[#EAF1EA] text-[#8C7E6D] hover:text-[#4A3728] transition-colors"
                      id="close-modal-btn"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Food Hero Image */}
                  <div className="w-full h-60 bg-[#FDFBF7] relative overflow-hidden" id="modal-image-holder">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={expandedItem.image}
                      alt={expandedItem.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
                  </div>

                  {/* Main Info */}
                  <div className="p-6 space-y-5 flex-1">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-4">
                        <h2 className="font-serif font-black text-xl text-[#4A3728]" id="modal-item-name">
                          {expandedItem.name}
                        </h2>
                        <span className="font-mono text-lg font-black text-[#D2691E] whitespace-nowrap" id="modal-item-price">
                          R$ {expandedItem.price.toFixed(2)}
                        </span>
                      </div>
                      <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-black text-[#8B4513] bg-[#F5F2ED] uppercase tracking-wider">
                        {expandedItem.category === 'artesanais' && '🍔 Hambúrgueres Artesanais'}
                        {expandedItem.category === 'tradicionais' && '🍔 Hambúrgueres Tradicionais'}
                        {expandedItem.category === 'marmitas' && '🍱 Marmitas'}
                        {expandedItem.category === 'churrasco' && '🥩 Churrasco na Brasa'}
                        {expandedItem.category === 'jantinhas' && '🍛 Jantinhas Caprichada'}
                        {expandedItem.category === 'bebidas' && '🥤 Bebida & Cerveja'}
                        {expandedItem.category === 'maionese' && '🥛 Maionese Caseira'}
                        {expandedItem.category === 'acrescimos' && '➕ Adicional / Acréscimo'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">
                        DescriÃ§Ã£o Completa
                      </h4>
                      <p className="text-xs text-[#8C7E6D] leading-relaxed font-medium" id="modal-item-description">
                        {expandedItem.description}
                      </p>
                    </div>

                    {/* Quantity selectors inside details modal */}
                    <div className="pt-4 border-t border-[#E5E0D8]/60 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">
                          Quantidade no Carrinho
                        </span>
                        
                        <div className="flex items-center gap-1 bg-[#F5F2ED] p-1 rounded-xl border border-[#E5E0D8]/50" id="modal-qty-selector">
                          {((cart[expandedItem.id] || 0) > 0) && (
                            <>
                              <button
                                onClick={() => updateCartQuantity(expandedItem.id, -1)}
                                className="w-8 h-8 rounded-lg hover:bg-[#E5E0D8] text-[#8C7E6D] hover:text-[#4A3728] flex items-center justify-center transition-all focus:outline-none"
                                title="Diminuir"
                              >
                                <Minus className="w-3.5 h-3.5 text-[#8C7E6D]" />
                              </button>
                              <span className="w-8 text-center font-mono text-xs font-bold text-[#4A3728]">
                                {cart[expandedItem.id] || 0}
                              </span>
                            </>
                          )}
                          <button
                            onClick={() => updateCartQuantity(expandedItem.id, 1)}
                            className="w-8 h-8 rounded-lg bg-[#8B4513] hover:bg-[#72380f] text-white flex items-center justify-center transition-all focus:outline-none"
                            title="Adicionar"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Optional Observation inside details modal */}
                      {((cart[expandedItem.id] || 0) > 0) && expandedItem.category !== 'bebidas' && (
                        <div className="space-y-1.5 animate-fade-in" id="modal-obs-section">
                          <label className="flex items-center gap-1.5 text-[10px] font-black text-[#8B4513] uppercase tracking-wider" htmlFor="modal-obs-input">
                            <MessageSquare className="w-3 h-3 text-[#8B4513]" />
                            ObservaÃ§Ãµes do Item
                          </label>
                          <input
                            id="modal-obs-input"
                            type="text"
                            placeholder="Ex: ponto da carne, sem cebola, etc..."
                            value={observations[expandedItem.id] || ''}
                            onChange={(e) => {
                              setObservations(prev => ({
                                ...prev,
                                [expandedItem.id]: e.target.value
                              }));
                            }}
                            className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] placeholder:text-[#8C7E6D]/50 focus:outline-none focus:ring-1 focus:ring-[#8B4513] transition-all font-medium"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions / Close */}
                  <div className="p-4 border-t border-[#E5E0D8]/60 bg-white sticky bottom-0 z-10">
                    <button
                      onClick={() => setExpandedItem(null)}
                      className="w-full bg-[#8B4513] hover:bg-[#72380f] text-white py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#8B4513]/20 cursor-pointer"
                    >
                      Voltar ao CardÃ¡pio
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Admin Login Dialog Modal */}
          <AnimatePresence>
            {showAdminModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowAdminModal(false)}
                id="admin-login-modal-overlay"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 15 }}
                  className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#E5E0D8] shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                  id="admin-login-card"
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-14 h-14 bg-[#8B4513]/10 text-[#8B4513] rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-lg text-[#4A3728]">
                        Acesso Administrativo
                      </h3>
                      <p className="text-xs text-[#8C7E6D] mt-1">
                        Insira a senha para acessar relatÃ³rios e editar o cardÃ¡pio.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <input
                        type="password"
                        placeholder="Digite a senha"
                        value={adminPassword}
                        onChange={(e) => {
                          setAdminPassword(e.target.value);
                          setAdminError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            // Trigger enter key submit
                            if (adminPassword === 'brasa@2026') {
                              setIsAdminOpen(true);
                              setShowAdminModal(false);
                              setAdminPassword('');
                              setAdminError('');
                              fetchOrdersForAdmin();
                            } else {
                              setAdminError('Senha incorreta!');
                            }
                          }
                        }}
                        className="w-full px-4 py-3 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-center text-[#4A3728] placeholder:text-[#8C7E6D]/50 focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                        id="admin-password-input"
                        autoFocus
                      />
                      {adminError && (
                        <p className="text-[10px] text-red-600 font-bold bg-red-50 py-1 px-3 rounded-lg border border-red-100">
                          {adminError}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAdminModal(false)}
                        className="py-3 px-4 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#8C7E6D] hover:bg-[#FDFBF7]"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (adminPassword === 'brasa@2026') {
                            setIsAdminOpen(true);
                            setShowAdminModal(false);
                            setAdminPassword('');
                            setAdminError('');
                            fetchOrdersForAdmin();
                          } else {
                            setAdminError('Senha incorreta!');
                          }
                        }}
                        className="py-3 px-4 rounded-xl bg-[#8B4513] hover:bg-[#72380f] text-white text-xs font-bold shadow-md shadow-[#8B4513]/10"
                      >
                        Desbloquear
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fully Immersive Admin Dashboard Overlay */}
          <AnimatePresence>
            {isAdminOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#FDFBF7] z-50 flex flex-col font-sans text-[#4A3728] overflow-hidden"
                id="admin-dashboard-root"
              >
                {/* Dashboard Top Header bar */}
                <div className="px-6 py-4 border-b border-[#E5E0D8] bg-white flex items-center justify-between shadow-sm sticky top-0 z-20">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#8B4513] p-2 rounded-xl text-white shadow">
                      <Flame className="w-5 h-5" />
                    </span>
                    <div>
                      <h2 className="font-serif font-black text-md text-[#8B4513]">
                        Painel Brasa Burguer
                      </h2>
                      <p className="text-[9px] text-[#8C7E6D] uppercase tracking-wider font-bold">
                        Gestão e Relatórios Operacionais
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E0D8] hover:bg-[#F5F2ED] text-[#8C7E6D] hover:text-[#4A3728] text-[10px] font-black uppercase tracking-wider transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5 text-[#8B4513]" />
                    Sair Painel
                  </button>
                </div>

                {/* Dashboard Secondary Navigation Tab Selector */}
                <div className="px-6 bg-white border-b border-[#E5E0D8] flex gap-2 overflow-x-auto py-1.5 scrollbar-none">
                  <button
                    onClick={() => {
                      setAdminTab('sales');
                      fetchOrdersForAdmin();
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      adminTab === 'sales'
                        ? 'bg-[#8B4513] text-white shadow-sm'
                        : 'text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#F5F2ED]'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Relatório de Vendas
                  </button>

                  <button
                    onClick={() => setAdminTab('items')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      adminTab === 'items'
                        ? 'bg-[#8B4513] text-white shadow-sm'
                        : 'text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#F5F2ED]'
                    }`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Cardápio (Alterar/Ocultar)
                  </button>

                  <button
                    onClick={() => setAdminTab('neighborhoods')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      adminTab === 'neighborhoods'
                        ? 'bg-[#8B4513] text-white shadow-sm'
                        : 'text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#F5F2ED]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Bairros & Taxas
                  </button>

                  <button
                    onClick={() => setAdminTab('config')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      adminTab === 'config'
                        ? 'bg-[#8B4513] text-white shadow-sm'
                        : 'text-[#8C7E6D] hover:text-[#4A3728] hover:bg-[#F5F2ED]'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Configurações
                  </button>
                </div>

                {/* Dashboard Scrollable Body Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* TAB 1: RELATÓRIO DE VENDAS & INTELIGÊNCIA DE FATURAMENTO */}
                  {adminTab === 'sales' && (
                    <div className="space-y-6">
                      {/* HEADER WITH ACTIONS */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#E5E0D8] p-5 rounded-2xl shadow-sm">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif font-black text-lg text-[#4A3728]">
                              Resumo de Faturamento & Vendas
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#8B4513]/10 text-[#8B4513]">
                              {salesAnalytics.periodFormatted}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#8C7E6D] mt-0.5">
                            Relatório executivo consolidado com análise de produtos, picos temporais e recomendações práticas.
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={handleCopyMarkdownReport}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-bold transition-all shadow-sm ${
                              copiedMarkdown 
                                ? 'bg-[#2E7D32] text-white border-[#2E7D32]' 
                                : 'bg-[#FDFBF7] hover:bg-[#F5F2ED] text-[#4A3728] border-[#E5E0D8]'
                            }`}
                            title="Copiar relatório formatado em Markdown"
                          >
                            {copiedMarkdown ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#8B4513]" />}
                            {copiedMarkdown ? 'Copiado!' : 'Copiar Markdown'}
                          </button>

                          <button
                            onClick={handleDownloadMarkdownReport}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F5F2ED] text-[#4A3728] border border-[#E5E0D8] text-[10px] font-bold shadow-sm transition-all"
                            title="Baixar relatório em arquivo .md"
                          >
                            <Download className="w-3.5 h-3.5 text-[#8B4513]" />
                            Baixar .MD
                          </button>

                          <button
                            onClick={() => {
                              const headers = ['ID', 'Data', 'Cliente', 'Telefone', 'Metodo', 'Bairro', 'Total (R$)', 'Status', 'Pagamento'];
                              const rows = filteredAdminOrders.map(o => [
                                o.id,
                                new Date(o.created_at).toLocaleString('pt-BR'),
                                o.customer_name,
                                o.customer_phone,
                                o.delivery_method,
                                o.neighborhood || 'N/A',
                                o.total,
                                o.status,
                                o.payment_method
                              ]);
                              const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
                                + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                              const encodedUri = encodeURI(csvContent);
                              const link = document.createElement("a");
                              link.setAttribute("href", encodedUri);
                              const safePeriod = periodFilter === 'specific' ? selectedSpecificDate.replace(/\//g, '-') : periodFilter;
                              link.setAttribute("download", `relatorio_brasa_${safePeriod}_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EAF1EA] hover:bg-[#D5E4D5] text-[#2E7D32] border border-[#C8E6C9] text-[10px] font-bold shadow-sm transition-all"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Exportar CSV
                          </button>

                          <button
                            onClick={fetchOrdersForAdmin}
                            className="flex items-center justify-center p-2 rounded-xl border border-[#E5E0D8] bg-white hover:bg-[#F5F2ED] text-[#8C7E6D] hover:text-[#4A3728] transition-all shadow-sm"
                            title="Atualizar Pedidos"
                          >
                            <RefreshCw className={`w-4 h-4 ${isLoadingOrders ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* DATE & PERIOD FILTER BAR */}
                      <div className="bg-white border border-[#E5E0D8] p-4 rounded-2xl shadow-sm space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E0D8]/60 pb-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-[#8B4513]/10 text-[#8B4513]">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black text-[#4A3728] uppercase tracking-wider">
                              Filtrar por Período ou Data
                            </span>
                            {periodFilter !== 'all' && (
                              <span className="flex items-center gap-1 bg-[#8B4513]/10 text-[#8B4513] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#8B4513]/20">
                                <Filter className="w-3 h-3" />
                                Filtro: {salesAnalytics.periodFormatted}
                              </span>
                            )}
                          </div>

                          {periodFilter !== 'all' && (
                            <button
                              onClick={() => {
                                setPeriodFilter('all');
                                setSelectedSpecificDate('');
                                setCustomStartDate('');
                                setCustomEndDate('');
                              }}
                              className="flex items-center gap-1 text-[11px] font-bold text-[#8B4513] hover:text-[#72380f] bg-[#FDFBF7] hover:bg-[#F5F2ED] border border-[#E5E0D8] px-3 py-1 rounded-xl transition-all cursor-pointer shadow-sm"
                            >
                              <X className="w-3.5 h-3.5" />
                              Limpar Filtro (Mostrar Todos)
                            </button>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Quick Presets */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              onClick={() => {
                                setPeriodFilter('all');
                                setSelectedSpecificDate('');
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                periodFilter === 'all'
                                  ? 'bg-[#8B4513] text-white shadow-sm'
                                  : 'bg-[#FDFBF7] text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                              }`}
                            >
                              Todos os Dias ({adminOrders.length})
                            </button>

                            <button
                              onClick={() => {
                                setPeriodFilter('today');
                                setSelectedSpecificDate('');
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                periodFilter === 'today'
                                  ? 'bg-[#8B4513] text-white shadow-sm'
                                  : 'bg-[#FDFBF7] text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                              }`}
                            >
                              Hoje
                            </button>

                            <button
                              onClick={() => {
                                setPeriodFilter('yesterday');
                                setSelectedSpecificDate('');
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                periodFilter === 'yesterday'
                                  ? 'bg-[#8B4513] text-white shadow-sm'
                                  : 'bg-[#FDFBF7] text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                              }`}
                            >
                              Ontem
                            </button>

                            <button
                              onClick={() => {
                                setPeriodFilter('7days');
                                setSelectedSpecificDate('');
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                periodFilter === '7days'
                                  ? 'bg-[#8B4513] text-white shadow-sm'
                                  : 'bg-[#FDFBF7] text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                              }`}
                            >
                              Últimos 7 dias
                            </button>

                            <button
                              onClick={() => {
                                setPeriodFilter('30days');
                                setSelectedSpecificDate('');
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                periodFilter === '30days'
                                  ? 'bg-[#8B4513] text-white shadow-sm'
                                  : 'bg-[#FDFBF7] text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                              }`}
                            >
                              Últimos 30 dias
                            </button>
                          </div>

                          {/* Dropdown for specific date */}
                          <div className="flex items-center gap-1.5">
                            <select
                              value={periodFilter === 'specific' ? selectedSpecificDate : ''}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setPeriodFilter('specific');
                                  setSelectedSpecificDate(e.target.value);
                                } else {
                                  setPeriodFilter('all');
                                  setSelectedSpecificDate('');
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                periodFilter === 'specific'
                                  ? 'bg-[#8B4513] text-white border-[#8B4513]'
                                  : 'bg-[#FDFBF7] text-[#4A3728] border-[#E5E0D8] hover:border-[#8C7E6D]'
                              }`}
                            >
                              <option value="" className="text-[#4A3728] bg-white">📅 Escolher Dia Específico...</option>
                              {allDailyStats.map(d => (
                                <option key={d.date} value={d.date} className="text-[#4A3728] bg-white">
                                  {d.date} ({d.dayOfWeek}) · {d.ordersCount} {d.ordersCount === 1 ? 'pedido' : 'pedidos'} · R$ {d.revenue.toFixed(2)}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Custom Date Range Selector */}
                          <div className="flex flex-wrap items-center gap-1.5 pl-1">
                            <span className="text-[10px] font-bold text-[#8C7E6D] uppercase">De:</span>
                            <input
                              type="date"
                              value={customStartDate}
                              onChange={(e) => {
                                setCustomStartDate(e.target.value);
                                setPeriodFilter('custom');
                              }}
                              className="px-2 py-1 rounded-xl text-xs border border-[#E5E0D8] bg-[#FDFBF7] text-[#4A3728] font-mono focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                            />
                            <span className="text-[10px] font-bold text-[#8C7E6D] uppercase">Até:</span>
                            <input
                              type="date"
                              value={customEndDate}
                              onChange={(e) => {
                                setCustomEndDate(e.target.value);
                                setPeriodFilter('custom');
                              }}
                              className="px-2 py-1 rounded-xl text-xs border border-[#E5E0D8] bg-[#FDFBF7] text-[#4A3728] font-mono focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* SUB-TAB NAVIGATOR */}
                      <div className="flex gap-2 border-b border-[#E5E0D8]/60 pb-1">
                        <button
                          onClick={() => setSalesReportTab('dashboard')}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            salesReportTab === 'dashboard'
                              ? 'bg-[#8B4513] text-white shadow-sm'
                              : 'bg-white text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                          }`}
                        >
                          <BarChart3 className="w-3.5 h-3.5" />
                          Painel Executivo
                        </button>

                        <button
                          onClick={() => setSalesReportTab('markdown')}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            salesReportTab === 'markdown'
                              ? 'bg-[#8B4513] text-white shadow-sm'
                              : 'bg-white text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Relatório Markdown & Tabelas
                        </button>

                        <button
                          onClick={() => setSalesReportTab('orders')}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            salesReportTab === 'orders'
                              ? 'bg-[#8B4513] text-white shadow-sm'
                              : 'bg-white text-[#8C7E6D] hover:text-[#4A3728] border border-[#E5E0D8]'
                          }`}
                        >
                          <PackageCheck className="w-3.5 h-3.5" />
                          Pedidos Recentes ({filteredAdminOrders.length}{periodFilter !== 'all' ? ` de ${adminOrders.length}` : ''})
                        </button>
                      </div>

                      {/* SECTION 1: VISÃO GERAL DAS VENDAS (KPIs) */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="bg-white border border-[#E5E0D8] p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                          <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">Faturamento Total</span>
                          <span className="font-serif text-2xl font-black text-[#8B4513] mt-2">
                            R$ {salesAnalytics.totalRevenue.toFixed(2)}
                          </span>
                          <span className="text-[9px] text-[#8C7E6D] mt-1 font-mono">
                            {salesAnalytics.totalOrders} pedidos realizados
                          </span>
                        </div>

                        <div className="bg-white border border-[#E5E0D8] p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                          <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">Volume de Itens</span>
                          <span className="font-mono text-2xl font-black text-[#4A3728] mt-2">
                            {salesAnalytics.totalItemsSold} <span className="text-xs font-medium text-[#8C7E6D]">unid.</span>
                          </span>
                          <span className="text-[9px] text-[#8C7E6D] mt-1">
                            Lanches, bebidas & extras
                          </span>
                        </div>

                        <div className="bg-white border border-[#E5E0D8] p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                          <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">Ticket Médio</span>
                          <span className="font-serif text-2xl font-black text-[#D2691E] mt-2">
                            R$ {salesAnalytics.ticketMedio.toFixed(2)}
                          </span>
                          <span className="text-[9px] text-[#8C7E6D] mt-1">
                            Valor médio por transação
                          </span>
                        </div>

                        <div className="bg-white border border-[#E5E0D8] p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                          <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">Taxas Coletadas</span>
                          <span className="font-serif text-2xl font-black text-[#2E7D32] mt-2">
                            R$ {salesAnalytics.totalDeliveryFees.toFixed(2)}
                          </span>
                          <span className="text-[9px] text-[#8C7E6D] mt-1">
                            {salesAnalytics.deliveryCount} entregas realizadas
                          </span>
                        </div>

                        <div 
                          onClick={() => {
                            if (periodFilter !== 'all') {
                              setPeriodFilter('all');
                              setSelectedSpecificDate('');
                            }
                          }}
                          className={`p-4 rounded-2xl flex flex-col justify-between shadow-sm col-span-2 md:col-span-1 transition-all ${
                            periodFilter !== 'all'
                              ? 'bg-[#8B4513]/5 border-2 border-[#8B4513] cursor-pointer hover:bg-[#8B4513]/10'
                              : 'bg-white border border-[#E5E0D8]'
                          }`}
                          title={periodFilter !== 'all' ? 'Clique para limpar filtro e ver todos os dias' : 'Período ativo'}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#8B4513]" /> Período
                            </span>
                            {periodFilter !== 'all' && (
                              <span className="text-[8px] font-black uppercase bg-[#8B4513] text-white px-1.5 py-0.5 rounded-full">
                                Filtrado
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs font-bold text-[#4A3728] mt-2 leading-tight">
                            {salesAnalytics.periodFormatted}
                          </span>
                          <div className="flex items-center justify-between mt-1 text-[9px]">
                            <span className="text-[#8C7E6D]">
                              {periodFilter === 'all' 
                                ? `${adminOrders.length} pedidos no total` 
                                : `${filteredAdminOrders.length} pedidos no filtro`}
                            </span>
                            {periodFilter !== 'all' && (
                              <span className="font-bold text-[#8B4513] hover:underline">
                                Limpar ✕
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* SUB-TAB 1: PAINEL EXECUTIVO */}
                      {salesReportTab === 'dashboard' && (
                        <div className="space-y-6">
                          {/* SECTION 1.5: TABELA DE VALORES DOS DIAS SEPARADOS */}
                          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-sm space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E0D8]/60 pb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-[#8B4513]/10 text-[#8B4513]">
                                    <Calendar className="w-4 h-4" />
                                  </div>
                                  <h4 className="font-serif font-black text-sm text-[#4A3728]">
                                    Faturamento por Data (Valores Separados dos Dias)
                                  </h4>
                                </div>
                                <p className="text-[11px] text-[#8C7E6D] mt-0.5">
                                  Acompanhe os valores de cada dia separadamente. Clique em &quot;Filtrar este dia&quot; para detalhar no painel.
                                </p>
                              </div>
                              <span className="text-[10px] font-bold bg-[#F5F2ED] text-[#8B4513] border border-[#E5E0D8] px-2.5 py-1 rounded-full self-start sm:self-center">
                                {allDailyStats.length} {allDailyStats.length === 1 ? 'dia registrado' : 'dias registrados'}
                              </span>
                            </div>

                            {allDailyStats.length === 0 ? (
                              <p className="text-xs text-[#8C7E6D] text-center py-6">Nenhum pedido computado no histórico.</p>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                  <thead>
                                    <tr className="border-b border-[#E5E0D8] text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">
                                      <th className="pb-2.5 pl-2 font-bold">Data</th>
                                      <th className="pb-2.5 font-bold">Dia da Semana</th>
                                      <th className="pb-2.5 text-center font-bold">Qtd. Pedidos</th>
                                      <th className="pb-2.5 text-center font-bold">Itens</th>
                                      <th className="pb-2.5 text-right font-bold">Taxas Coletadas</th>
                                      <th className="pb-2.5 text-right font-bold">Ticket Médio</th>
                                      <th className="pb-2.5 text-right font-bold">Faturamento Total</th>
                                      <th className="pb-2.5 text-center pr-2 font-bold">Ação</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E5E0D8]/60">
                                    {allDailyStats.map((day) => {
                                      const isDayActive = periodFilter === 'specific' && selectedSpecificDate === day.date;
                                      const maxDailyRev = Math.max(...allDailyStats.map(s => s.revenue), 1);
                                      const percentOfPeak = Math.min(100, Math.max(8, (day.revenue / maxDailyRev) * 100));

                                      return (
                                        <tr 
                                          key={day.date}
                                          className={`transition-colors ${
                                            isDayActive ? 'bg-[#8B4513]/10 font-bold' : 'hover:bg-[#FDFBF7]'
                                          }`}
                                        >
                                          <td className="py-3 pl-2">
                                            <div className="flex items-center gap-1.5">
                                              <span className={`w-2 h-2 rounded-full ${isDayActive ? 'bg-[#8B4513]' : 'bg-[#D2691E]'}`} />
                                              <span className="font-mono font-bold text-[#4A3728]">{day.date}</span>
                                            </div>
                                          </td>
                                          <td className="py-3 text-[#8C7E6D]">
                                            {day.dayOfWeek}
                                          </td>
                                          <td className="py-3 text-center">
                                            <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5F2ED] text-[#4A3728] font-bold font-mono text-[11px]">
                                              {day.ordersCount} {day.ordersCount === 1 ? 'ped' : 'peds'}
                                            </span>
                                          </td>
                                          <td className="py-3 text-center font-mono text-[#8C7E6D]">
                                            {day.itemsCount} un.
                                          </td>
                                          <td className="py-3 text-right font-mono text-[#2E7D32]">
                                            R$ {day.deliveryFees.toFixed(2)}
                                          </td>
                                          <td className="py-3 text-right font-mono text-[#D2691E]">
                                            R$ {day.ticketMedio.toFixed(2)}
                                          </td>
                                          <td className="py-3 text-right pr-3">
                                            <div className="flex flex-col items-end">
                                              <span className="font-serif font-black text-sm text-[#8B4513]">
                                                R$ {day.revenue.toFixed(2)}
                                              </span>
                                              <div className="w-24 bg-[#F5F2ED] h-1.5 rounded-full overflow-hidden mt-1">
                                                <div 
                                                  className="bg-[#8B4513] h-full rounded-full transition-all"
                                                  style={{ width: `${percentOfPeak}%` }}
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td className="py-3 text-center pr-2">
                                            {isDayActive ? (
                                              <button
                                                onClick={() => {
                                                  setPeriodFilter('all');
                                                  setSelectedSpecificDate('');
                                                }}
                                                className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#8B4513] text-white shadow-sm hover:bg-[#72380f] transition-all cursor-pointer"
                                                title="Clique para voltar a ver todos os dias"
                                              >
                                                ✓ Filtrado (Limpar)
                                              </button>
                                            ) : (
                                              <button
                                                onClick={() => {
                                                  setPeriodFilter('specific');
                                                  setSelectedSpecificDate(day.date);
                                                }}
                                                className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#FDFBF7] hover:bg-[#8B4513] text-[#8B4513] hover:text-white border border-[#E5E0D8] hover:border-[#8B4513] transition-all cursor-pointer"
                                                title={`Filtrar todo o painel para ${day.date}`}
                                              >
                                                Filtrar este dia
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                  <tfoot>
                                    <tr className="border-t-2 border-[#E5E0D8] font-bold bg-[#FDFBF7]">
                                      <td colSpan={2} className="py-3 pl-2 text-[#4A3728]">
                                        Total Consolidado ({allDailyStats.length} dias)
                                      </td>
                                      <td className="py-3 text-center font-mono text-[#4A3728]">
                                        {allDailyStats.reduce((acc, d) => acc + d.ordersCount, 0)} pedidos
                                      </td>
                                      <td className="py-3 text-center font-mono text-[#8C7E6D]">
                                        {allDailyStats.reduce((acc, d) => acc + d.itemsCount, 0)} un.
                                      </td>
                                      <td className="py-3 text-right font-mono text-[#2E7D32]">
                                        R$ {allDailyStats.reduce((acc, d) => acc + d.deliveryFees, 0).toFixed(2)}
                                      </td>
                                      <td className="py-3 text-right font-mono text-[#D2691E]">
                                        R$ {(allDailyStats.reduce((acc, d) => acc + d.revenue, 0) / (allDailyStats.reduce((acc, d) => acc + d.ordersCount, 0) || 1)).toFixed(2)}
                                      </td>
                                      <td className="py-3 text-right font-serif font-black text-[#8B4513] pr-3">
                                        R$ {allDailyStats.reduce((acc, d) => acc + d.revenue, 0).toFixed(2)}
                                      </td>
                                      <td className="py-3 text-center pr-2">
                                        {periodFilter !== 'all' && (
                                          <button
                                            onClick={() => {
                                              setPeriodFilter('all');
                                              setSelectedSpecificDate('');
                                            }}
                                            className="text-[10px] text-[#8B4513] font-bold underline cursor-pointer"
                                          >
                                            Ver Todos
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            )}
                          </div>
                          {/* SECTION 2: DESEMPENHO DE PRODUTOS */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Top 5 Mais Vendidos */}
                            <div className="bg-white border border-[#E5E0D8] p-5 rounded-2xl shadow-sm space-y-4">
                              <div className="flex items-center justify-between border-b border-[#E5E0D8]/60 pb-2">
                                <div className="flex items-center gap-2">
                                  <Award className="w-4 h-4 text-[#D2691E]" />
                                  <h4 className="text-xs font-black text-[#4A3728] uppercase tracking-wider">
                                    Top 5 Produtos Mais Vendidos
                                  </h4>
                                </div>
                                <span className="text-[10px] font-bold bg-[#EAF1EA] text-[#2E7D32] px-2 py-0.5 rounded-full">
                                  {salesAnalytics.top5RevenueShare.toFixed(1)}% do Faturamento
                                </span>
                              </div>

                              {salesAnalytics.topProducts.length === 0 ? (
                                <p className="text-xs text-[#8C7E6D] text-center py-4">Nenhuma venda computada ainda.</p>
                              ) : (
                                <div className="space-y-3">
                                  {salesAnalytics.topProducts.map((prod, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                      <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2">
                                          <span className="w-5 h-5 rounded-full bg-[#8B4513]/10 text-[#8B4513] font-bold text-[10px] flex items-center justify-center">
                                            {idx + 1}
                                          </span>
                                          <span className="font-bold text-[#4A3728]">{prod.name}</span>
                                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#F5F2ED] text-[#8C7E6D]">
                                            {prod.category}
                                          </span>
                                        </div>
                                        <div className="text-right">
                                          <span className="font-mono font-bold text-[#8B4513]">R$ {prod.revenue.toFixed(2)}</span>
                                          <span className="text-[10px] text-[#8C7E6D] ml-2">({prod.qty} un · {prod.sharePercentage.toFixed(1)}%)</span>
                                        </div>
                                      </div>
                                      <div className="w-full bg-[#F5F2ED] h-1.5 rounded-full overflow-hidden">
                                        <div 
                                          className="bg-[#8B4513] h-full rounded-full transition-all duration-500"
                                          style={{ width: `${Math.min(100, Math.max(8, prod.sharePercentage))}%` }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Produtos Menos Vendidos / Baixo Giro */}
                            <div className="bg-white border border-[#E5E0D8] p-5 rounded-2xl shadow-sm space-y-4">
                              <div className="flex items-center justify-between border-b border-[#E5E0D8]/60 pb-2">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                                  <h4 className="text-xs font-black text-[#4A3728] uppercase tracking-wider">
                                    Produtos com Menor Giro (Giro Zero)
                                  </h4>
                                </div>
                                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                                  {salesAnalytics.unsoldTotalCount} itens sem saída
                                </span>
                              </div>

                              <div className="space-y-2.5">
                                {salesAnalytics.lowTurnProducts.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-xl bg-[#FDFBF7] border border-[#E5E0D8]/60">
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                      <span className="font-medium text-[#4A3728]">{item.name}</span>
                                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#F5F2ED] text-[#8C7E6D]">
                                        {item.category}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-mono font-bold text-[#8C7E6D]">R$ {item.price.toFixed(2)}</span>
                                      <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded ml-2 font-bold">0 vendas</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* SECTION 3: ANÁLISE TEMPORAL E TENDÊNCIAS */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Pico de Vendas */}
                            <div className="bg-white border border-[#E5E0D8] p-5 rounded-2xl shadow-sm space-y-2">
                              <div className="flex items-center justify-between border-b border-[#E5E0D8]/60 pb-2">
                                <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">Pico de Vendas</span>
                                <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
                              </div>
                              {salesAnalytics.peakDay ? (
                                <div className="pt-1">
                                  <span className="text-xl font-serif font-black text-[#8B4513] block">
                                    {salesAnalytics.peakDay.date}
                                  </span>
                                  <p className="text-xs font-mono font-bold text-[#4A3728] mt-1">
                                    R$ {salesAnalytics.peakDay.revenue.toFixed(2)} ({salesAnalytics.totalRevenue > 0 ? ((salesAnalytics.peakDay.revenue / salesAnalytics.totalRevenue) * 100).toFixed(1) : 0}% do total)
                                  </p>
                                  <p className="text-[10px] text-[#8C7E6D] mt-0.5">
                                    {salesAnalytics.peakDay.ordersCount} pedidos registrados nesta data
                                  </p>
                                </div>
                              ) : (
                                <p className="text-xs text-[#8C7E6D]">Sem histórico temporal</p>
                              )}
                            </div>

                            {/* Tendência Operacional */}
                            <div className="bg-white border border-[#E5E0D8] p-5 rounded-2xl shadow-sm space-y-2">
                              <div className="flex items-center justify-between border-b border-[#E5E0D8]/60 pb-2">
                                <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">Diagnóstico de Tendência</span>
                                <BarChart3 className="w-4 h-4 text-[#D2691E]" />
                              </div>
                              <div className="pt-1">
                                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black bg-[#F5F2ED] text-[#8B4513] border border-[#E5E0D8]">
                                  Oscilação por Janelas
                                </span>
                                <p className="text-xs text-[#4A3728] mt-2 leading-relaxed">
                                  {salesAnalytics.trend}
                                </p>
                              </div>
                            </div>

                            {/* Canais de Pagamento & Entrega */}
                            <div className="bg-white border border-[#E5E0D8] p-5 rounded-2xl shadow-sm space-y-3">
                              <div className="flex items-center justify-between border-b border-[#E5E0D8]/60 pb-2">
                                <span className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">Canais e Métodos</span>
                                <PieChart className="w-4 h-4 text-[#8B4513]" />
                              </div>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between items-center">
                                  <span className="text-[#4A3728]">⚡ PIX:</span>
                                  <span className="font-bold text-[#8B4513]">{salesAnalytics.pixCount} ped ({salesAnalytics.totalOrders > 0 ? ((salesAnalytics.pixCount / salesAnalytics.totalOrders) * 100).toFixed(0) : 0}%)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#4A3728]">💵 Dinheiro:</span>
                                  <span className="font-bold text-[#8C7E6D]">{salesAnalytics.cashCount} ped</span>
                                </div>
                                <div className="flex justify-between items-center pt-1 border-t border-[#E5E0D8]/60">
                                  <span className="text-[#4A3728]">🛵 Entrega:</span>
                                  <span className="font-bold text-[#2E7D32]">{salesAnalytics.deliveryCount} ped</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#4A3728]">🏪 Retirada:</span>
                                  <span className="font-bold text-[#8C7E6D]">{salesAnalytics.pickupCount} ped</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* SECTION 4: INSIGHTS E RECOMENDAÇÕES DE AÇÃO */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* 3 Pontos Fortes */}
                            <div className="bg-white border border-[#C8E6C9] p-5 rounded-2xl shadow-sm space-y-3">
                              <div className="flex items-center gap-2 border-b border-[#C8E6C9]/80 pb-2">
                                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                                <h4 className="text-xs font-black text-[#2E7D32] uppercase tracking-wider">
                                  3 Pontos Fortes da Operação
                                </h4>
                              </div>
                              <ul className="space-y-2 text-xs text-[#4A3728]">
                                <li className="flex items-start gap-2">
                                  <span className="font-bold text-[#2E7D32]">1.</span>
                                  <span><strong>Linha Artesanal Forte:</strong> Mais de 63% do faturamento vem dos hambúrgueres premium.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-bold text-[#2E7D32]">2.</span>
                                  <span><strong>Ticket Médio Robusto:</strong> R$ {salesAnalytics.ticketMedio.toFixed(2)} por pedido com bebidas e adicionais.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-bold text-[#2E7D32]">3.</span>
                                  <span><strong>Adesão ao PIX:</strong> Maioria dos clientes usa PIX, acelerando fechamento de caixa.</span>
                                </li>
                              </ul>
                            </div>

                            {/* 3 Gargalos / Oportunidades */}
                            <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-sm space-y-3">
                              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider">
                                  3 Gargalos / Oportunidades
                                </h4>
                              </div>
                              <ul className="space-y-2 text-xs text-[#4A3728]">
                                <li className="flex items-start gap-2">
                                  <span className="font-bold text-amber-600">1.</span>
                                  <span><strong>Dependência do Topo:</strong> 2 lanches concentram mais de 50% de toda a receita.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-bold text-amber-600">2.</span>
                                  <span><strong>Mix Estagnado:</strong> Categorias inteiras (Jantinhas/Marmitas) com zero giro.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="font-bold text-amber-600">3.</span>
                                  <span><strong>Hiato Operacional:</strong> Demanda em picos isolados, sem fluxo linear durante o mês.</span>
                                </li>
                              </ul>
                            </div>

                            {/* 2 Recomendações Estratégicas */}
                            <div className="bg-white border border-[#8B4513]/30 p-5 rounded-2xl shadow-sm space-y-3">
                              <div className="flex items-center gap-2 border-b border-[#8B4513]/20 pb-2">
                                <Lightbulb className="w-4 h-4 text-[#8B4513]" />
                                <h4 className="text-xs font-black text-[#8B4513] uppercase tracking-wider">
                                  2 Recomendações Estratégicas
                                </h4>
                              </div>
                              <ul className="space-y-2.5 text-xs text-[#4A3728]">
                                <li className="flex items-start gap-2">
                                  <span className="w-5 h-5 rounded-full bg-[#8B4513] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                                    1
                                  </span>
                                  <span><strong>Combos Promocionais:</strong> Lançar combos casados (Burger + Bebida + Sobremesa) para girar o mix e elevar o ticket médio para R$ 50+.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-5 h-5 rounded-full bg-[#8B4513] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                                    2
                                  </span>
                                  <span><strong>Ativação no WhatsApp:</strong> Campanhas temáticas em dias ociosos (ex: Quinta do Espeto) com taxa fixa de R$ 3 para ativar clientes.</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 2: RELATÓRIO MARKDOWN & TABELAS FORMATADAS */}
                      {salesReportTab === 'markdown' && (
                        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 space-y-4 shadow-sm">
                          <div className="flex items-center justify-between border-b border-[#E5E0D8]/60 pb-3">
                            <div>
                              <h4 className="text-sm font-bold text-[#4A3728]">
                                Visualização em Markdown (Pronto para Exportação)
                              </h4>
                              <p className="text-[11px] text-[#8C7E6D]">
                                Tabelas e métricas organizadas no padrão executivo conforme solicitado.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={handleCopyMarkdownReport}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B4513] hover:bg-[#72380f] text-white text-xs font-bold transition-all shadow"
                              >
                                {copiedMarkdown ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copiedMarkdown ? 'Copiado para a área de transferência!' : 'Copiar Texto Completo'}
                              </button>
                            </div>
                          </div>

                          <pre className="p-4 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs font-mono text-[#4A3728] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
                            {generateMarkdownReport()}
                          </pre>
                        </div>
                      )}

                      {/* SUB-TAB 3: HISTÓRICO DE PEDIDOS DETALHADOS (EXIBIDO CASO TAB = ORDERS OU DASHBOARD) */}
                      {(salesReportTab === 'orders' || salesReportTab === 'dashboard') && (
                        <div className="space-y-3 pt-2">
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8]/60 pb-2">
                            <h4 className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider">
                              Histórico de Pedidos Recentes ({filteredAdminOrders.length}{periodFilter !== 'all' ? ` de ${adminOrders.length}` : ''})
                            </h4>
                            
                            {filteredAdminOrders.length > 0 && (
                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-[#8C7E6D] cursor-pointer hover:text-[#4A3728] select-none">
                                  <input
                                    type="checkbox"
                                    checked={filteredAdminOrders.length > 0 && selectedOrderIds.length === filteredAdminOrders.length}
                                    onChange={handleToggleSelectAll}
                                    className="w-3.5 h-3.5 rounded border-[#E5E0D8] text-[#8B4513] focus:ring-[#8B4513] focus:ring-offset-0 focus:ring-1 cursor-pointer accent-[#8B4513]"
                                  />
                                  Selecionar todos
                                </label>

                                {selectedOrderIds.length > 0 && (
                                  <div className="flex items-center gap-1.5 animate-fadeIn">
                                    {isConfirmingBulkDelete ? (
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={handleBulkDelete}
                                          className="px-2 py-1 text-[9px] font-black rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-sm"
                                        >
                                          Sim, excluir ({selectedOrderIds.length})
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setIsConfirmingBulkDelete(false)}
                                          className="px-2 py-1 text-[9px] font-bold rounded-lg bg-[#F5F2ED] border border-[#E5E0D8] text-[#8C7E6D] hover:bg-[#E5E0D8] transition-all cursor-pointer"
                                        >
                                          Não
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setIsConfirmingBulkDelete(true)}
                                        className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-black rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all cursor-pointer shadow-sm"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                        Excluir Selecionados ({selectedOrderIds.length})
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {isLoadingOrders ? (
                            <div className="text-center py-8 text-xs text-[#8C7E6D]">
                              <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#8B4513] mb-2" />
                              Carregando histórico de vendas...
                            </div>
                          ) : filteredAdminOrders.length === 0 ? (
                            <div className="bg-white border border-[#E5E0D8] p-8 rounded-2xl text-center text-xs text-[#8C7E6D]">
                              {adminOrders.length === 0 ? 'Nenhum pedido cadastrado ainda.' : 'Nenhum pedido encontrado para o período/data selecionado.'}
                            </div>
                          ) : (
                            <div className="space-y-2.5">
                              {filteredAdminOrders.map((order) => (
                                <div key={order.id} className={`bg-white border rounded-2xl p-4 space-y-3 shadow-sm hover:border-[#8C7E6D] transition-colors ${selectedOrderIds.includes(order.id) ? 'border-[#8B4513] bg-[#FDFBF7]' : 'border-[#E5E0D8]'}`}>
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex items-start gap-2.5">
                                      <input
                                        type="checkbox"
                                        checked={selectedOrderIds.includes(order.id)}
                                        onChange={() => handleToggleSelectOrder(order.id)}
                                        className="w-3.5 h-3.5 mt-0.5 rounded border-[#E5E0D8] text-[#8B4513] focus:ring-[#8B4513] focus:ring-offset-0 focus:ring-1 cursor-pointer accent-[#8B4513]"
                                      />
                                      <div>
                                        <h5 className="font-bold text-xs text-[#4A3728]">
                                          {order.customer_name}
                                        </h5>
                                        <p className="text-[10px] font-mono text-[#8C7E6D] mt-0.5">
                                          {new Date(order.created_at).toLocaleString('pt-BR')} | Bairro: {order.neighborhood || 'Retirada'}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xs font-serif font-black text-[#D2691E] block">
                                        R$ {Number(order.total).toFixed(2)}
                                      </span>
                                      <span className="text-[9px] text-[#8C7E6D] font-mono">
                                        {order.payment_method === 'pix' ? '⚡ Pix' : '💵 Dinheiro'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* CART ITEMS SUMMARY */}
                                  <div className="bg-[#FDFBF7] p-2.5 rounded-xl border border-[#E5E0D8]/60 text-xs space-y-1">
                                    {order.cart && Object.entries(order.cart).map(([itemId, qty]) => {
                                      const item = menuItems.find(m => m.id === itemId);
                                      return (
                                        <div key={itemId} className="flex justify-between text-[11px] text-[#4A3728]">
                                          <span>{String(qty)}x {item ? item.name : `Item ${itemId}`}</span>
                                          <span className="font-mono text-[#8C7E6D]">
                                            R$ {((item ? item.price : 0) * Number(qty)).toFixed(2)}
                                          </span>
                                        </div>
                                      );
                                    })}
                                    {order.delivery_rate > 0 && (
                                      <div className="flex justify-between text-[11px] text-[#2E7D32] pt-1 border-t border-[#E5E0D8]/60">
                                        <span>Taxa de Entrega</span>
                                        <span className="font-mono font-bold">R$ {Number(order.delivery_rate).toFixed(2)}</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* ORDER FOOTER & STATUS */}
                                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#E5E0D8]/60">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold text-[#8C7E6D]">Status:</span>
                                      <select
                                        value={order.status || 'pendente'}
                                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                        className="text-[10px] font-bold bg-white border border-[#E5E0D8] rounded-lg px-2 py-1 text-[#4A3728] focus:outline-none"
                                      >
                                        <option value="pendente">⏳ Pendente</option>
                                        <option value="preparando">🍳 Preparando</option>
                                        <option value="saiu_entrega">🛵 Saiu para Entrega</option>
                                        <option value="entregue">✅ Entregue</option>
                                        <option value="cancelado">❌ Cancelado</option>
                                      </select>
                                    </div>

                                    {orderIdToConfirmDelete === order.id ? (
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteOrder(order.id)}
                                          className="px-2 py-1 text-[9px] font-black rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-sm"
                                        >
                                          Confirmar
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setOrderIdToConfirmDelete(null)}
                                          className="px-2 py-1 text-[9px] font-bold rounded-lg bg-[#F5F2ED] border border-[#E5E0D8] text-[#8C7E6D] hover:bg-[#E5E0D8] transition-all cursor-pointer"
                                        >
                                          Cancelar
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setOrderIdToConfirmDelete(order.id)}
                                        className="flex items-center gap-1 px-2 py-1 text-[9px] font-bold rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                        Excluir
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: GERENCIAR CARDÁPIO (ALTERAR/OCULTAR) */}
                  {adminTab === 'items' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-serif font-black text-lg text-[#4A3728]">
                            Gerenciar Itens do CardÃ¡pio
                          </h3>
                          <p className="text-[11px] text-[#8C7E6D]">
                            Altere preÃ§os, descriÃ§Ãµes ou oculte itens do catÃ¡logo do cliente instantaneamente.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setNewItemForm({
                              id: `item-${Date.now().toString().slice(-4)}`,
                              name: '',
                              category: 'artesanais',
                              price: 0,
                              description: '',
                              image: '/Bacon Grill.jpg'
                            });
                            setIsCreatingNewItem(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#8B4513] hover:bg-[#72380f] text-white text-[10px] font-black uppercase tracking-wider shadow-md"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Novo Produto
                        </button>
                      </div>

                      {/* Menu edit list */}
                      <div className="space-y-3">
                        {menuItems.map((item) => (
                          <div
                            key={item.id}
                            className={`bg-white border border-[#E5E0D8] rounded-2xl p-4 flex gap-4 transition-all relative ${
                              item.hidden ? 'opacity-55 border-dashed bg-[#FDFBF7]' : 'shadow-sm'
                            }`}
                          >
                            {/* Product thumbnail */}
                            <div className="w-16 h-16 rounded-xl bg-[#F5F2ED] overflow-hidden flex-shrink-0 border border-[#E5E0D8]/40">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-xs text-[#4A3728] truncate">
                                  {item.name}
                                </h4>
                                {item.hidden && (
                                  <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-red-100 text-red-700">
                                    Ocultado
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-[#8C7E6D] line-clamp-1">
                                {item.description}
                              </p>
                              <div className="flex items-center gap-3 pt-1">
                                <span className="font-mono text-xs font-black text-[#D2691E]">
                                  R$ {item.price.toFixed(2)}
                                </span>
                                <span className="text-[9px] font-semibold text-[#8C7E6D] uppercase tracking-wider bg-[#F5F2ED] px-2 py-0.5 rounded">
                                  {item.category}
                                </span>
                              </div>
                            </div>

                            {/* Row actions */}
                            <div className="flex flex-col sm:flex-row gap-1.5 items-center justify-center flex-shrink-0 border-l border-[#E5E0D8]/50 pl-3">
                              {/* Toggle visibility */}
                              <button
                                onClick={() => handleToggleItemHidden(item)}
                                className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                                  item.hidden
                                    ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600'
                                    : 'bg-[#EAF1EA] hover:bg-[#D5E4D5] border-green-200 text-[#2E7D32]'
                                }`}
                                title={item.hidden ? 'Mostrar no CardÃ¡pio' : 'Ocultar do CardÃ¡pio'}
                              >
                                {item.hidden ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>

                              {/* Edit details */}
                              <button
                                onClick={() => setEditingItem(item)}
                                className="p-2 rounded-xl border border-[#E5E0D8] hover:bg-[#F5F2ED] text-[#8C7E6D] hover:text-[#4A3728] flex items-center justify-center transition-all"
                                title="Editar Detalhes"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: BAIRROS & TAXAS */}
                  {adminTab === 'neighborhoods' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-serif font-black text-lg text-[#4A3728]">
                          Bairros e Taxas de Entrega
                        </h3>
                        <p className="text-[11px] text-[#8C7E6D]">
                          Cadastre bairros atendidos e configure o valor da taxa de entrega cobrada por localidade.
                        </p>
                      </div>

                      {/* Feedback Alert Banner */}
                      {neighborhoodMessage && (
                        <div
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                            neighborhoodMessage.type === 'success'
                              ? 'bg-green-50 border-green-200 text-[#2E7D32]'
                              : 'bg-red-50 border-red-200 text-red-600'
                          }`}
                        >
                          <span>{neighborhoodMessage.text}</span>
                          <button
                            type="button"
                            onClick={() => setNeighborhoodMessage(null)}
                            className="p-1 text-gray-400 hover:text-gray-600 font-bold ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      {/* Add Neighborhood Form */}
                      <form onSubmit={handleAddNeighborhood} className="bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl p-4 mb-4">
                        <h4 className="font-bold text-xs text-[#4A3728] mb-3 flex items-center gap-1.5">
                          <PlusCircle className="w-4 h-4 text-[#8B4513]" />
                          Adicionar Novo Bairro
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                          <input 
                            type="text" 
                            placeholder="Nome do Bairro (ex: Centro, Vila Nova...)" 
                            className="w-full sm:flex-1 px-3 py-2 text-xs bg-white border border-[#E5E0D8] rounded-lg text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                            value={newNeighborhoodName}
                            onChange={(e) => setNewNeighborhoodName(e.target.value)}
                            disabled={isNeighborhoodLoading}
                          />
                          <div className="flex w-full sm:w-auto items-center bg-white border border-[#E5E0D8] rounded-lg px-2.5">
                            <span className="font-mono text-xs font-bold text-[#8C7E6D] mr-1">R$</span>
                            <input 
                              type="text" 
                              inputMode="decimal"
                              placeholder="0,00" 
                              className="w-20 px-1 py-2 text-xs font-mono font-bold bg-transparent text-[#4A3728] focus:outline-none"
                              value={newNeighborhoodRate}
                              onChange={(e) => setNewNeighborhoodRate(e.target.value)}
                              disabled={isNeighborhoodLoading}
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isNeighborhoodLoading}
                            className="w-full sm:w-auto px-5 py-2 bg-[#8B4513] hover:bg-[#72380f] text-white text-xs font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            {isNeighborhoodLoading ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                Salvando...
                              </>
                            ) : (
                              'Adicionar'
                            )}
                          </button>
                        </div>
                      </form>

                      {/* Neighborhoods List */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-xs text-[#4A3728]">
                            Bairros Cadastrados ({neighborhoods.length})
                          </h4>
                          <span className="text-[10px] text-[#8C7E6D]">
                            Total de {neighborhoods.length} localidades
                          </span>
                        </div>

                        {neighborhoods.length === 0 ? (
                          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-8 text-center text-[#8C7E6D] text-xs">
                            Nenhum bairro cadastrado ainda. Use o formulário acima para adicionar.
                          </div>
                        ) : (
                          <div className="bg-white border border-[#E5E0D8] rounded-2xl divide-y divide-[#E5E0D8]/60 shadow-xs">
                            {neighborhoods.map((n) => (
                              <div key={n.name} className="p-3.5 sm:p-4 flex items-center justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <p className="font-bold text-xs text-[#4A3728] truncate">{n.name}</p>
                                  <p className="text-[10px] text-[#8C7E6D] mt-0.5">Taxa de entrega</p>
                                </div>

                                {editingNeighborhood?.name === n.name ? (
                                  <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap justify-end" id="editing-rate-box">
                                    <div className="flex items-center bg-white border border-[#8B4513] rounded-lg px-2">
                                      <span className="font-mono text-xs font-bold text-[#8C7E6D] mr-1">R$</span>
                                      <input
                                        type="text"
                                        inputMode="decimal"
                                        autoFocus
                                        className="w-16 px-1 py-1.5 text-xs font-mono font-bold bg-transparent text-[#4A3728] focus:outline-none"
                                        value={editingNeighborhoodRate}
                                        onChange={(e) => setEditingNeighborhoodRate(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleUpdateNeighborhoodRate(n.name);
                                          if (e.key === 'Escape') setEditingNeighborhood(null);
                                        }}
                                        disabled={isNeighborhoodLoading}
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateNeighborhoodRate(n.name)}
                                      disabled={isNeighborhoodLoading}
                                      className="p-1.5 rounded-lg bg-[#2E7D32] hover:bg-[#256325] text-white flex items-center justify-center transition-colors disabled:opacity-50"
                                      title="Salvar Taxa"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingNeighborhood(null);
                                        setEditingNeighborhoodRate('');
                                      }}
                                      disabled={isNeighborhoodLoading}
                                      className="p-1.5 rounded-lg border border-[#E5E0D8] hover:bg-gray-100 text-gray-500 text-xs font-bold transition-colors"
                                      title="Cancelar"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                    <span className="font-mono text-xs font-black text-[#D2691E] bg-[#FFF8F0] px-2 py-1 rounded-lg border border-[#F5E6D8]">
                                      R$ {n.rate.toFixed(2)}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditNeighborhood(n)}
                                      className="px-2.5 py-1.5 rounded-lg border border-[#E5E0D8] text-[10px] font-bold text-[#8C7E6D] hover:bg-[#F5F2ED] hover:text-[#4A3728] transition-colors"
                                    >
                                      Alterar Taxa
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteNeighborhood(n.name)}
                                      className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                                      title={`Excluir ${n.name}`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CONFIGURAÃ‡Ã•ES GERAIS */}
                  {adminTab === 'config' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-serif font-black text-lg text-[#4A3728]">
                          ConfiguraÃ§Ãµes Gerais
                        </h3>
                        <p className="text-[11px] text-[#8C7E6D]">
                          Atualize as chaves e nÃºmeros que o aplicativo usa para faturamento.
                        </p>
                      </div>

                      <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 space-y-4">
                        {/* Status da Entrega toggle */}
                        <div className="space-y-2.5 p-4 bg-[#FDFBF7] rounded-xl border border-[#E5E0D8]/60">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-black text-[#8B4513] uppercase tracking-wider block">
                                Status da Entrega (Delivery) do InÃ­cio
                              </span>
                              <span className="text-[9px] text-[#8C7E6D]">
                                Ative ou desative o serviÃ§o de entrega na pÃ¡gina inicial.
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDeliveryEnabled(!deliveryEnabled)}
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                deliveryEnabled ? 'bg-[#2E7D32]' : 'bg-red-600'
                              }`}
                              id="toggle-delivery-status-button"
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  deliveryEnabled ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${deliveryEnabled ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`} />
                            <span className="text-xs font-bold text-[#4A3728]">
                              {deliveryEnabled ? 'ServiÃ§o de Entrega ATIVO' : 'ServiÃ§o de Entrega DESATIVADO'}
                            </span>
                          </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#8B4513] uppercase tracking-wider block">
                            NÃºmero do WhatsApp do Estabelecimento
                          </label>
                          <input
                            type="text"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            placeholder="Ex: 5533998646238"
                            className="w-full px-3 py-2.5 bg-white border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                          />
                          <p className="text-[9px] text-[#8C7E6D]">
                            Insira com cÃ³digo do paÃ­s (55) e DDD. Sem traÃ§os, parÃªnteses ou espaÃ§os.
                          </p>
                        </div>

                        {/* Pix Key */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#8B4513] uppercase tracking-wider block">
                            Chave PIX Recebedora
                          </label>
                          <input
                            type="text"
                            value={pixKey}
                            onChange={(e) => setPixKey(e.target.value)}
                            placeholder="Ex: brasaburguer.pix@gmail.com"
                            className="w-full px-3 py-2.5 bg-white border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                          />
                          <p className="text-[9px] text-[#8C7E6D]">
                            Pode ser e-mail, celular, CNPJ ou chave aleatÃ³ria onde os clientes pagarÃ£o via pix copia-e-cola.
                          </p>
                        </div>

                        {/* Save Action */}
                        <div className="pt-3 border-t border-[#E5E0D8]/60">
                          <button
                            onClick={() => handleSaveConfig(whatsappNumber, pixKey, deliveryEnabled)}
                            className="w-full bg-[#8B4513] hover:bg-[#72380f] text-white py-3 rounded-xl font-bold text-xs shadow"
                          >
                            Salvar ConfiguraÃ§Ãµes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ITEM EDIT MODAL */}
          <AnimatePresence>
            {editingItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                onClick={() => setEditingItem(null)}
                id="edit-item-modal-overlay"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-white rounded-3xl p-6 w-full max-w-md border border-[#E5E0D8] shadow-2xl relative max-h-[90%] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                  id="edit-item-form-card"
                >
                  <h3 className="font-serif font-black text-md text-[#4A3728] border-b border-[#E5E0D8]/60 pb-3 mb-4">
                    Editar Produto: {editingItem.name}
                  </h3>

                  <div className="space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">Nome do Item</label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">PreÃ§o (R$)</label>
                        <input
                          type="number"
                          step="0.50"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs font-mono font-bold text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">Categoria</label>
                        <select
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-xs font-bold text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                        >
                          <option value="artesanais">🍔 Artesanais</option>
                          <option value="tradicionais">🍔 Tradicionais</option>
                          <option value="marmitas">🍱 Marmitas</option>
                          <option value="churrasco">🥩 Churrasco</option>
                          <option value="jantinhas">🍛 Jantinhas</option>
                          <option value="bebidas">🥤 Bebidas</option>
                          <option value="maionese">🥛 Maionese</option>
                          <option value="sobremesas">🍰 Sobremesas</option>
                          <option value="acrescimos">➕ Adicionais</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">DescriÃ§Ã£o</label>
                      <textarea
                        rows={3}
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513] resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">URL da Imagem</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                        disabled={isUploadingImage}
                        className="w-full text-xs text-[#4A3728] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#8B4513] file:text-white hover:file:bg-[#72380f]"
                      />
                      {isUploadingImage && <p className="text-xs text-[#8B4513] mt-1">Enviando imagem...</p>}
                      <input
                        type="text"
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs font-mono text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-5 mt-4 border-t border-[#E5E0D8]/60">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="py-3 px-4 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#8C7E6D] hover:bg-[#FDFBF7]"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={isSavingItem}
                      onClick={() => handleSaveItemDetails(editingItem)}
                      className="py-3 px-4 rounded-xl bg-[#8B4513] hover:bg-[#72380f] text-white text-xs font-bold shadow-md shadow-[#8B4513]/10"
                    >
                      {isSavingItem ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CREATE NEW ITEM MODAL */}
          <AnimatePresence>
            {isCreatingNewItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                onClick={() => setIsCreatingNewItem(false)}
                id="create-item-modal-overlay"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-white rounded-3xl p-6 w-full max-w-md border border-[#E5E0D8] shadow-2xl relative max-h-[90%] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                  id="create-item-form-card"
                >
                  <h3 className="font-serif font-black text-md text-[#4A3728] border-b border-[#E5E0D8]/60 pb-3 mb-4">
                    Cadastrar Novo Produto
                  </h3>

                  <div className="space-y-4 text-left">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">ID do Item (Ãšnico)</label>
                        <input
                          type="text"
                          placeholder="Ex: a7, t5, e8"
                          value={newItemForm.id}
                          onChange={(e) => setNewItemForm({ ...newItemForm, id: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs font-mono font-bold text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">Categoria</label>
                        <select
                          value={newItemForm.category}
                          onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-xs font-bold text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                        >
                          <option value="artesanais">🍔 Artesanais</option>
                          <option value="tradicionais">🍔 Tradicionais</option>
                          <option value="marmitas">🍱 Marmitas</option>
                          <option value="churrasco">🥩 Churrasco</option>
                          <option value="jantinhas">🍛 Jantinhas</option>
                          <option value="bebidas">🥤 Bebidas</option>
                          <option value="maionese">🥛 Maionese</option>
                          <option value="sobremesas">🍰 Sobremesas</option>
                          <option value="acrescimos">➕ Adicionais</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">Nome do Produto</label>
                      <input
                        type="text"
                        placeholder="Ex: Cheddar Flame"
                        value={newItemForm.name}
                        onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">PreÃ§o (R$)</label>
                      <input
                        type="number"
                        step="0.50"
                        placeholder="0.00"
                        value={newItemForm.price || ''}
                        onChange={(e) => setNewItemForm({ ...newItemForm, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs font-mono font-bold text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">DescriÃ§Ã£o</label>
                      <textarea
                        rows={3}
                        placeholder="Insira detalhes saborosos do hambÃºrguer..."
                        value={newItemForm.description}
                        onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513] resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#8C7E6D] uppercase tracking-wider block">URL da Imagem</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        disabled={isUploadingImage}
                        className="w-full text-xs text-[#4A3728] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#8B4513] file:text-white hover:file:bg-[#72380f]"
                      />
                      {isUploadingImage && <p className="text-xs text-[#8B4513] mt-1">Enviando imagem...</p>}
                      <input
                        type="text"
                        placeholder="Ex: /Bacon Grill.jpg"
                        value={newItemForm.image}
                        onChange={(e) => setNewItemForm({ ...newItemForm, image: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F5F2ED] border border-[#E5E0D8] rounded-xl text-base sm:text-xs font-mono text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-5 mt-4 border-t border-[#E5E0D8]/60">
                    <button
                      type="button"
                      onClick={() => setIsCreatingNewItem(false)}
                      className="py-3 px-4 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#8C7E6D] hover:bg-[#FDFBF7]"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={isSavingItem}
                      onClick={handleCreateNewItem}
                      className="py-3 px-4 rounded-xl bg-[#8B4513] hover:bg-[#72380f] text-white text-xs font-bold shadow-md shadow-[#8B4513]/10"
                    >
                      {isSavingItem ? 'Criando...' : 'Criar Produto'}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
