import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search as SearchIcon, LogOut } from 'lucide-react';

interface SearchData {
  sip: string;
  ddr: string;
  lp: string;
}

interface ResultData extends SearchData {
  cliente: string;
  atposx: string;
  cabo: string;
  fibras: string;
  enlace: string;
  porta: string;
}

const SearchUser = () => {
  const [searchData, setSearchData] = useState<SearchData>({
    sip: '',
    ddr: '',
    lp: ''
  });
  const [results, setResults] = useState<ResultData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResults([]);

    try {
      let url = '';
      if (searchData.sip) {
        url = `http://127.0.0.1:5000/buscar/sip?sip=${encodeURIComponent(searchData.sip)}`;
      } else if (searchData.ddr) {
        url = `http://127.0.0.1:5000/buscar/ddr?ddr=${encodeURIComponent(searchData.ddr)}`;
      } else if (searchData.lp) {
        url = `http://127.0.0.1:5000/buscar/lp?lp=${encodeURIComponent(searchData.lp)}`;
      } else {
        alert('Preencha pelo menos um campo para pesquisar.');
        setIsSearching(false);
        return;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Erro ao buscar dados');

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert('Erro na busca: ' + err.message);
    } finally {
      setIsSearching(false);
    }
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
            <Link to="/">
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
                <Label htmlFor="sip" className="text-sm font-medium text-gray-700">SIP</Label>
                <Input id="sip" name="sip" type="text" value={searchData.sip} onChange={handleInputChange} placeholder="Digite o SIP" />
              </div>

              <div>
                <Label htmlFor="ddr" className="text-sm font-medium text-gray-700">DDR</Label>
                <Input id="ddr" name="ddr" type="text" value={searchData.ddr} onChange={handleInputChange} placeholder="Digite o DDR" />
              </div>

              <div>
                <Label htmlFor="lp" className="text-sm font-medium text-gray-700">LP</Label>
                <Input id="lp" name="lp" type="text" value={searchData.lp} onChange={handleInputChange} placeholder="Digite o LP" />
              </div>
            </div>

            <Button type="submit" disabled={isSearching} className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
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
                        <p><strong>SIP:</strong> {result.sip}</p>
                        <p><strong>DDR:</strong> {result.ddr}</p>
                        <p><strong>LP:</strong> {result.lp}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Atp/Osx:</strong> {result.atposx}</p>
                      <p><strong>Cabo:</strong> {result.cabo}</p>
                      <p><strong>Fibras:</strong> {result.fibras}</p>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Enlace:</strong> {result.enlace} metros</p>
                      <p><strong>Porta:</strong> {result.porta}</p>
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

export default SearchUser;
