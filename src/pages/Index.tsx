
import { Link } from 'react-router-dom';
import DataForm from '@/components/DataForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Cadastro
          </h1>
          <p className="text-lg text-gray-600">
            Preencha os dados do formulário abaixo
          </p>
          
          <div className="mt-6">
            <Link 
              to="/searchadmin" 
              className="inline-flex items-center px-4 py-2 text-white rounded-md transition-colors butoon_acessar"
            >
              Acessar Sistema de Pesquisa
            </Link>
          </div>
        </div>
        
        <DataForm />
      </div>
    </div>
  );
};

export default Index;
