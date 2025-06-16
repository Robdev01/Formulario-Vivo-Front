import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import loginIcon from '@/assets/logo_vivo.png';
import { ArrowBigLeft } from 'lucide-react';


const Register = () => {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [permissao, setPermissao] = useState('user'); // default 'user'
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !login || !senha || !confirmarSenha) {
      alert('Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/cadastro_usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, login, senha, permissao })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Cadastro realizado com sucesso!');
      } else {
        alert(data.error || 'Erro ao registrar usuário');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center gap-2 mt-6">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Registrar</h2>
          <img src={loginIcon} alt="Ícone de login" className="w-8 h-8" />
        </div>
        <div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crie sua conta para acessar o sistema
          </p>
           <div className="mt-6">
            <Link to="/searchadmin" className="inline-flex items-center px-4 py-2 text-white rounded-md transition-colors butoon_acessar">
              
                <ArrowBigLeft size={16} />
                Volta 
              
            </Link>
          </div>
        </div>
       
       

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="login">Login</Label>
              <Input id="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input id="confirmarSenha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="permissao">Permissão</Label>
              <select
                id="permissao"
                value={permissao}
                onChange={(e) => setPermissao(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded"
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <Button
              type="submit"
              style={{ backgroundColor: 'blueviolet' }}
              className="w-full text-white"
            >
              Registrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-500 text-sm">
              Já tem conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
