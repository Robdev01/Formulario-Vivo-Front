
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import loginIcon from '@/assets/logo_vivo.png'

const Login = () => {
  const [login, setUsername] = useState('');
  const [senha, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!login || !senha) {
      alert('Por favor, preencha todos os campos');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: login,
          senha: senha
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('usuarioLogado', JSON.stringify({
          login: data.login,
          nome: data.nome,
          permissao: data.permissao
        }));
        // Redireciona com base na permissão retornada pela API
        if (data.permissao === 'admin') {
          navigate('/searchadmin');
        } else {
          navigate('/searchuser');
        }
      } else {
        alert(data.error || 'Erro ao realizar login');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de conexão com o servidor');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center gap-2 mt-6">
           
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">                
            Login
          </h2>
          <img src={loginIcon} alt="Ícone de login" className="w-8 h-8" />
        </div>
        <div>
           <p className="mt-2 text-center text-sm text-gray-600">
            Acesse o sistema de pesquisa
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                value={login}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="mt-1"
                required
              />
            </div>

            <Button
              type="submit"
              style={{ backgroundColor: 'blueviolet' }}
              className="w-full butoon_acessar text-white"
            >
              Entrar
            </Button>
          </form>
          
          
          </div>
        </div>
      </div>
    
  );
};

export default Login;
