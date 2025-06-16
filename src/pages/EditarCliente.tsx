import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditarCliente = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cliente = location.state;

  const [formData, setFormData] = useState(cliente);

  useEffect(() => {
    if (!cliente) {
      alert('Cliente não encontrado');
      navigate('/');
    }
  }, [cliente, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:5000/atualizar/cadastro/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Erro ao atualizar');

      alert('Cliente atualizado com sucesso!');
      navigate(-1); // volta para a página anterior
    } catch (err: any) {
      alert('Erro ao atualizar: ' + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['cliente', 'sip', 'ddr', 'lp', 'atpOsx', 'cabo', 'fibras', 'enlace', 'porta'].map((campo) => (
          <div key={campo}>
            <Label htmlFor={campo}>{campo.toUpperCase()}</Label>
            <Input
              id={campo}
              name={campo}
              value={formData[campo]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="col-span-full flex justify-between mt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Salvar</Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;
