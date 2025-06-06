import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search as SearchIcon, LogOut, Settings } from 'lucide-react';

interface SearchData {
  sip: string;
  ddr: string;
  lp: string;
}

interface ResultData extends SearchData {
  cliente: string;
  atpOsx: string;
  cabo: string;
  fibras: string;
  enlace: string;
  porta: string;
}

const SearchAdmin = () => {
  const [searchData, setSearchData] = useState<SearchData>({
    sip: '',
    ddr: '',
    lp: ''
  });
  const [results, setResults] = useState<ResultData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Dados simulados para demonstração
  const mockData: ResultData[] = [
    {
      sip: '1001',
      ddr: '4733001001',
      lp: 'LP001',
      cliente: 'Empresa ABC Ltda',
      atpOsx: 'ATP123',
      cabo: 'Cabo-01',
      fibras: '12F',
      enlace: '1500',
      porta: 'P1'
    },
    {
      sip: '1002',
      ddr: '4733001002',
      lp: 'LP002',
      cliente: 'Comercial XYZ',
      atpOsx: 'OSX456',
      cabo: 'Cabo-02',
      fibras: '24F',
      enlace: '800',
      porta: 'P2'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    console.log('Searching for:', searchData);
    
    // Simular busca no backend
    setTimeout(() => {
      const filteredResults = mockData.filter(item => {
        const sipMatch = !searchData.sip || item.sip.includes(searchData.sip);
        const ddrMatch = !searchData.ddr || item.ddr.includes(searchData.ddr);
        const lpMatch = !searchData.lp || item.lp.includes(searchData.lp);
        
        return sipMatch && ddrMatch && lpMatch;
      });
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Sistema de Pesquisa
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Pesquise por SIP, DDR ou LP
            </p>
          </div>
          
          <div className="flex gap-2">
            <Link to="/admin">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                Admin
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut size={16} />
                Sair
              </Button>
            </Link>
          </div>
        </div>

        {/* Formulário de Pesquisa */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sip" className="text-sm font-medium text-gray-700">
                  SIP
                </Label>
                <Input
                  id="sip"
                  name="sip"
                  type="text"
                  value={searchData.sip}
                  onChange={handleInputChange}
                  placeholder="Digite o SIP"
                />
              </div>

              <div>
                <Label htmlFor="ddr" className="text-sm font-medium text-gray-700">
                  DDR
                </Label>
                <Input
                  id="ddr"
                  name="ddr"
                  type="text"
                  value={searchData.ddr}
                  onChange={handleInputChange}
                  placeholder="Digite o DDR"
                />
              </div>

              <div>
                <Label htmlFor="lp" className="text-sm font-medium text-gray-700">
                  LP
                </Label>
                <Input
                  id="lp"
                  name="lp"
                  type="text"
                  value={searchData.lp}
                  onChange={handleInputChange}
                  placeholder="Digite o LP"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSearching}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              <SearchIcon size={16} />
              {isSearching ? 'Pesquisando...' : 'Pesquisar'}
            </Button>
          </form>
        </div>

        {/* Resultados */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Resultados da Pesquisa ({results.length})
            </h2>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{result.cliente}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">SIP:</span> {result.sip}</p>
                        <p><span className="font-medium">DDR:</span> {result.ddr}</p>
                        <p><span className="font-medium">LP:</span> {result.lp}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Atp/Osx:</span> {result.atpOsx}</p>
                      <p><span className="font-medium">Cabo:</span> {result.cabo}</p>
                      <p><span className="font-medium">Fibras:</span> {result.fibras}</p>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Enlace:</span> {result.enlace} metros</p>
                      <p><span className="font-medium">Porta:</span> {result.porta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !isSearching && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-500">Nenhum resultado encontrado. Tente pesquisar com diferentes critérios.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAdmin;
