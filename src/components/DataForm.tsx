
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  cliente: string;
  sip: string;
  ddr: string;
  lp: string;
  atpOsx: string;
  cabo: string;
  fibras: string;
  enlace: string;
  porta: string;
}

const DataForm = () => {
  const [formData, setFormData] = useState<FormData>({
    cliente: '',
    sip: '',
    ddr: '',
    lp: '',
    atpOsx: '',
    cabo: '',
    fibras: '',
    enlace: '',
    porta: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [ sucess, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);


    try{
      // Envia os dados para api
      const response = await fetch('http://api/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Caso precise de autenticação, adicione aqui, ex:
          // 'Authorization': `Bearer ${seuToken}`          
        },
        body: JSON.stringify(formData) // Converte os dados do formulário em JSON
      });
      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para a API');
      }

      const result = await response.json();
      setSuccess('Dados enviados com sucesso!');
      console.log('Resposta da API:', result);

      // Opcional: Limpa o formulário após o envio
      setFormData({
        cliente: '',
        sip: '',
        ddr: '',
        lp: '',
        atpOsx: '',
        cabo: '',
        fibras: '',
        enlace: '',
        porta: ''
      });
    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao enviar os dados');
      console.error('Erro:', err);
    }
  };


  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Formulário de Dados
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cliente" className="text-sm font-medium text-gray-700">
              Cliente
            </Label>
            <Input
              id="cliente"
              name="cliente"
              type="text"
              value={formData.cliente}
              onChange={handleInputChange}
              placeholder="Digite o nome do cliente"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sip" className="text-sm font-medium text-gray-700">
              SIP
            </Label>
            <Input
              id="sip"
              name="sip"
              type="text"
              value={formData.sip}
              onChange={handleInputChange}
              placeholder="Digite o SIP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ddr" className="text-sm font-medium text-gray-700">
              DDR
            </Label>
            <Input
              id="ddr"
              name="ddr"
              type="text"
              value={formData.ddr}
              onChange={handleInputChange}
              placeholder="Digite o DDR"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lp" className="text-sm font-medium text-gray-700">
              LP
            </Label>
            <Input
              id="lp"
              name="lp"
              type="text"
              value={formData.lp}
              onChange={handleInputChange}
              placeholder="Digite o LP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="atpOsx" className="text-sm font-medium text-gray-700">
              Atp/Osx
            </Label>
            <Input
              id="atpOsx"
              name="atpOsx"
              type="text"
              value={formData.atpOsx}
              onChange={handleInputChange}
              placeholder="Digite o Atp/Osx"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cabo" className="text-sm font-medium text-gray-700">
              Cabo
            </Label>
            <Input
              id="cabo"
              name="cabo"
              type="text"
              value={formData.cabo}
              onChange={handleInputChange}
              placeholder="Digite o cabo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fibras" className="text-sm font-medium text-gray-700">
              Fibras
            </Label>
            <Input
              id="fibras"
              name="fibras"
              type="text"
              value={formData.fibras}
              onChange={handleInputChange}
              placeholder="Digite as fibras"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enlace" className="text-sm font-medium text-gray-700">
              Enlace (metros)
            </Label>
            <Input
              id="enlace"
              name="enlace"
              type="text"
              value={formData.enlace}
              onChange={handleInputChange}
              placeholder="Digite o enlace em metros"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="porta" className="text-sm font-medium text-gray-700">
              Porta
            </Label>
            <Input
              id="porta"
              name="porta"
              type="text"
              value={formData.porta}
              onChange={handleInputChange}
              placeholder="Digite a porta"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DataForm;
