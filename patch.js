const fs = require('fs');
const path = require('path');
const file = 'c:/brasa-burguer-delivery/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /category: 'artesanais' \| 'tradicionais' \| 'churrasco' \| 'jantinhas' \| 'bebidas' \| 'maionese' \| 'acrescimos';/g,
  "category: 'artesanais' | 'tradicionais' | 'churrasco' | 'jantinhas' | 'bebidas' | 'maionese' | 'acrescimos' | 'sobremesas';"
);

code = code.replace(
  /useState<'all' \| 'artesanais' \| 'tradicionais' \| 'churrasco' \| 'jantinhas' \| 'bebidas' \| 'maionese' \| 'acrescimos'>\('all'\);/g,
  "useState<'all' | 'artesanais' | 'tradicionais' | 'churrasco' | 'jantinhas' | 'bebidas' | 'maionese' | 'acrescimos' | 'sobremesas'>('all');"
);

code = code.replace(
  /\(\['artesanais', 'tradicionais', 'maionese', 'churrasco', 'jantinhas', 'bebidas'\] as const\)/g,
  "(['artesanais', 'tradicionais', 'maionese', 'churrasco', 'jantinhas', 'bebidas', 'sobremesas'] as const)"
);

code = code.replace(
  /artesanais: '🍔 Hambúrgueres Artesanais',/g,
  "artesanais: '🍔 Hambúrgueres Artesanais',\n                          sobremesas: '🍰 Sobremesas',"
);

code = code.replace(
  /\{expandedItem\.category === 'bebidas' && '🥤 Bebida Gelada'\}/g,
  "{expandedItem.category === 'bebidas' && '🥤 Bebida Gelada'}\n                          {expandedItem.category === 'sobremesas' && '🍰 Sobremesa'}"
);

code = code.replace(
  /<option value="bebidas">🥤 Bebidas<\/option>/g,
  "<option value=\"bebidas\">🥤 Bebidas</option>\n                            <option value=\"sobremesas\">🍰 Sobremesas</option>"
);

code = code.replace(
  /const \[editingNeighborhood, setEditingNeighborhood\] = useState<Neighborhood \| null>\(null\);/g,
  "const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null);\n  const [newNeighborhoodName, setNewNeighborhoodName] = useState('');\n  const [newNeighborhoodRate, setNewNeighborhoodRate] = useState('');\n"
);

code = code.replace(
  /const handleUpdateNeighborhoodRate = async \(name: string, rate: number\) => \{/g,
  `const handleAddNeighborhood = async () => {
    if (!newNeighborhoodName || !newNeighborhoodRate) return;
    try {
      const resp = await fetch('/api/neighborhoods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newNeighborhoodName, rate: Number(newNeighborhoodRate) })
      });
      if (resp.ok) {
        const data = await resp.json();
        if(data.success && data.neighborhood) {
           setNeighborhoods([...neighborhoods, data.neighborhood]);
        }
        setNewNeighborhoodName('');
        setNewNeighborhoodRate('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNeighborhood = async (name: string) => {
    if (!confirm(\`Deseja realmente excluir o bairro \${name}?\`)) return;
    try {
      const resp = await fetch(\`/api/neighborhoods?name=\${encodeURIComponent(name)}\`, { method: 'DELETE' });
      if (resp.ok) {
        setNeighborhoods(neighborhoods.filter(n => n.name !== name));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateNeighborhoodRate = async (name: string, rate: number) => {`
);

code = code.replace(
  /Alterar Taxa\n                                  <\/button>/g,
  `Alterar Taxa
                                  </button>
                                  <button
                                    onClick={() => handleDeleteNeighborhood(n.name)}
                                    className="px-2.5 py-1.5 rounded-lg border border-[#E5E0D8] text-[9px] font-bold text-red-600 hover:bg-red-50"
                                  >
                                    Remover
                                  </button>`
);

code = code.replace(
  /<div className="bg-white border border-\[\#E5E0D8\] rounded-2xl divide-y divide-\[\#E5E0D8\]\/60">/g,
  `<div className="bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl p-4 mb-4">
                        <h4 className="font-bold text-xs text-[#4A3728] mb-3">Adicionar Novo Bairro</h4>
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                          <input 
                            type="text" 
                            placeholder="Nome do Bairro" 
                            className="w-full sm:flex-1 px-3 py-2 text-xs bg-white border border-[#E5E0D8] rounded-lg text-[#4A3728] focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                            value={newNeighborhoodName}
                            onChange={(e) => setNewNeighborhoodName(e.target.value)}
                          />
                          <div className="flex w-full sm:w-auto items-center bg-white border border-[#E5E0D8] rounded-lg px-2">
                            <span className="font-mono text-xs font-bold text-[#8C7E6D]">R$</span>
                            <input 
                              type="number" 
                              step="0.50" 
                              placeholder="0.00" 
                              className="w-20 px-2 py-2 text-xs font-mono font-bold bg-transparent text-[#4A3728] focus:outline-none"
                              value={newNeighborhoodRate}
                              onChange={(e) => setNewNeighborhoodRate(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={handleAddNeighborhood}
                            className="w-full sm:w-auto px-4 py-2 bg-[#8B4513] hover:bg-[#72380f] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Adicionar
                          </button>
                        </div>
                      </div>

                      <div className="bg-white border border-[#E5E0D8] rounded-2xl divide-y divide-[#E5E0D8]/60">`
);

fs.writeFileSync(file, code);
console.log('Done.');
