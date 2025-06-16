import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  cliente: string;
  sip: string;
  ddr: string;
  lp: string;
  atposx: string;
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
    atposx: '',
    cabo: '',
    fibras: '',
    enlace: '',
    porta: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showJson, setShowJson] = useState(false); // Controla a exibição do JSON

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
    setShowJson(true); // Mostra o JSON antes de enviar

    // Validação de campos obrigatórios
    const requiredFields = ['cliente', 'sip', 'ddr', 'lp', 'atposx', 'cabo', 'fibras', 'enlace', 'porta'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`O campo ${field} é obrigatório.`);
        setShowJson(false); // Oculta o JSON se houver erro
        return;
      }
    }

    // Exibe os dados a serem enviados
    const jsonToSend = JSON.stringify(formData);
    console.log('Tentativa de envio para URL:', 'http://127.0.0.1:5000/cadastro');
    console.log('Enviando dados:', jsonToSend);

    try {
      const response = await fetch('http://127.0.0.1:5000/cadastro', { // URL ajustada
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha na requisição');
      }
      

      const result = await response.json();
      setSuccess('Dados enviados com sucesso!');
      console.log('Resposta da API:', result);
      setShowJson(false); // Oculta o JSON após sucesso
       // ✅ Recarrega a página após 1 segundo
       setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao enviar os dados');
      console.error('Erro detalhado:', err);
    } finally {
      setShowJson(false); // Garante que o JSON seja oculto após a tentativa
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Formulário de Dados
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        
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
            <Label htmlFor="atposx" className="text-sm font-medium text-gray-700">
              Atp/Osx
            </Label>
            <Input
              id="atposx"
              name="atposx"
              type="text"
              value={formData.atposx}
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
            style={{ backgroundColor: 'blueviolet' }}
            className="w-full text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Enviar
          </Button>
        </div>

        {/* Seção para exibir o JSON */}
        {showJson && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700">Dados a serem enviados:</h3>
            <pre className="text-sm text-gray-800 overflow-auto max-h-40">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default DataForm;