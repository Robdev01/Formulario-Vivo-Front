import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, LogOut, Settings, Save } from 'lucide-react';

interface AdminData {
  id: string;
  sip: string;
  ddr: string;
  lp: string;
  cliente: string;
  atpOsx: string;
  cabo: string;
  fibras: string;
  enlace: string;
  porta: string;
}

interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  endpoints: {
    search: string;
    create: string;
    update: string;
    delete: string;
  };
}

const Admin = () => {
  // Dados simulados para demonstração
  const [data, setData] = useState<AdminData[]>([
    {
      id: '1',
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
      id: '2',
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
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminData | null>(null);
  const [formData, setFormData] = useState<Omit<AdminData, 'id'>>({
    sip: '',
    ddr: '',
    lp: '',
    cliente: '',
    atpOsx: '',
    cabo: '',
    fibras: '',
    enlace: '',
    porta: ''
  });

  // API Configuration state
  const [apiConfig, setApiConfig] = useState<ApiConfig>(() => {
    const saved = localStorage.getItem('apiConfig');
    return saved ? JSON.parse(saved) : {
      baseUrl: '',
      apiKey: '',
      endpoints: {
        search: '/api/search',
        create: '/api/create',
        update: '/api/update',
        delete: '/api/delete'
      }
    };
  });

  const handleApiConfigChange = (field: string, value: string) => {
    if (field.startsWith('endpoints.')) {
      const endpointKey = field.split('.')[1];
      setApiConfig(prev => ({
        ...prev,
        endpoints: {
          ...prev.endpoints,
          [endpointKey]: value
        }
      }));
    } else {
      setApiConfig(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const saveApiConfig = () => {
    localStorage.setItem('apiConfig', JSON.stringify(apiConfig));
    setIsApiDialogOpen(false);
    console.log('Configuração de API salva:', apiConfig);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Editar item existente
      setData(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id }
          : item
      ));
      console.log('Item editado:', { ...formData, id: editingItem.id });
    } else {
      // Criar novo item
      const newItem = {
        ...formData,
        id: Date.now().toString()
      };
      setData(prev => [...prev, newItem]);
      console.log('Novo item criado:', newItem);
    }

    // Resetar formulário
    setFormData({
      sip: '',
      ddr: '',
      lp: '',
      cliente: '',
      atpOsx: '',
      cabo: '',
      fibras: '',
      enlace: '',
      porta: ''
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: AdminData) => {
    setEditingItem(item);
    setFormData({
      sip: item.sip,
      ddr: item.ddr,
      lp: item.lp,
      cliente: item.cliente,
      atpOsx: item.atpOsx,
      cabo: item.cabo,
      fibras: item.fibras,
      enlace: item.enlace,
      porta: item.porta
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      setData(prev => prev.filter(item => item.id !== id));
      console.log('Item excluído:', id);
    }
  };

  const handleNewItem = () => {
    setEditingItem(null);
    setFormData({
      sip: '',
      ddr: '',
      lp: '',
      cliente: '',
      atpOsx: '',
      cabo: '',
      fibras: '',
      enlace: '',
      porta: ''
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Painel de Administração
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Gerencie os dados do sistema
            </p>
          </div>
          
          <div className="flex gap-4">
            {/* API Configuration Dialog */}
            <Dialog open={isApiDialogOpen} onOpenChange={setIsApiDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings size={16} />
                  Configurar APIs
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Configuração de APIs</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="baseUrl">URL Base da API</Label>
                    <Input
                      id="baseUrl"
                      value={apiConfig.baseUrl}
                      onChange={(e) => handleApiConfigChange('baseUrl', e.target.value)}
                      placeholder="https://api.exemplo.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="apiKey">Chave da API</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiConfig.apiKey}
                      onChange={(e) => handleApiConfigChange('apiKey', e.target.value)}
                      placeholder="Sua chave de API"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Endpoints</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-sm">Pesquisa</Label>
                        <Input
                          value={apiConfig.endpoints.search}
                          onChange={(e) => handleApiConfigChange('endpoints.search', e.target.value)}
                          placeholder="/api/search"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Criar</Label>
                        <Input
                          value={apiConfig.endpoints.create}
                          onChange={(e) => handleApiConfigChange('endpoints.create', e.target.value)}
                          placeholder="/api/create"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Atualizar</Label>
                        <Input
                          value={apiConfig.endpoints.update}
                          onChange={(e) => handleApiConfigChange('endpoints.update', e.target.value)}
                          placeholder="/api/update"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Deletar</Label>
                        <Input
                          value={apiConfig.endpoints.delete}
                          onChange={(e) => handleApiConfigChange('endpoints.delete', e.target.value)}
                          placeholder="/api/delete"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsApiDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={saveApiConfig} className="flex items-center gap-2">
                      <Save size={16} />
                      Salvar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleNewItem} className="flex items-center gap-2">
                  <Plus size={16} />
                  Novo Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Editar Item' : 'Novo Item'}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input
                        id="cliente"
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sip">SIP</Label>
                      <Input
                        id="sip"
                        name="sip"
                        value={formData.sip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ddr">DDR</Label>
                      <Input
                        id="ddr"
                        name="ddr"
                        value={formData.ddr}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lp">LP</Label>
                      <Input
                        id="lp"
                        name="lp"
                        value={formData.lp}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="atpOsx">Atp/Osx</Label>
                      <Input
                        id="atpOsx"
                        name="atpOsx"
                        value={formData.atpOsx}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cabo">Cabo</Label>
                      <Input
                        id="cabo"
                        name="cabo"
                        value={formData.cabo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fibras">Fibras</Label>
                      <Input
                        id="fibras"
                        name="fibras"
                        value={formData.fibras}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="enlace">Enlace (metros)</Label>
                      <Input
                        id="enlace"
                        name="enlace"
                        value={formData.enlace}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="porta">Porta</Label>
                      <Input
                        id="porta"
                        name="porta"
                        value={formData.porta}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingItem ? 'Salvar' : 'Criar'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Link to="/search">
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut size={16} />
                Voltar
              </Button>
            </Link>
          </div>
        </div>

        {/* Status da API */}
        {apiConfig.baseUrl && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-700">API Configurada</h3>
                  <p className="text-sm text-gray-600">URL: {apiConfig.baseUrl}</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de itens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{item.cliente}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">SIP:</span>
                    <span>{item.sip}</span>
                    <span className="font-medium">DDR:</span>
                    <span>{item.ddr}</span>
                    <span className="font-medium">LP:</span>
                    <span>{item.lp}</span>
                    <span className="font-medium">Atp/Osx:</span>
                    <span>{item.atpOsx}</span>
                    <span className="font-medium">Cabo:</span>
                    <span>{item.cabo}</span>
                    <span className="font-medium">Fibras:</span>
                    <span>{item.fibras}</span>
                    <span className="font-medium">Enlace:</span>
                    <span>{item.enlace}m</span>
                    <span className="font-medium">Porta:</span>
                    <span>{item.porta}</span>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1"
                  >
                    <Edit size={14} />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 text-lg">Nenhum item cadastrado ainda.</p>
              <p className="text-gray-400 mt-2">Clique em "Novo Item" para começar.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
