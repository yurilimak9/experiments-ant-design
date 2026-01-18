// Interface que espelha ESTRITAMENTE o retorno da API JSONPlaceholder
interface UserDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Interface do nosso Domínio (O que a UI realmente precisa)
export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
  companyName: string;
  // Campos computados/enriquecidos pelo front-end
  role: "ADMIN" | "EDITOR" | "VIEWER";
  status: "active" | "inactive";
  lastLogin: Date; // Usando objeto Date real para facilitar formatação
}

// Mapper: Transforma DTO em Domain Model
// Isso isola a UI de mudanças na API. Se a API mudar 'company.name' para 'company.title',
// só mudamos aqui, e não em 50 arquivos de componentes.
const mapUserDtoToDomain = (dto: UserDTO): User => {
  // Lógica determinística para "simular" dados que a API não tem
  const isEven = dto.id % 2 === 0;

  return {
    id: dto.id,
    name: dto.name,
    email: dto.email.toLowerCase(),
    website: `https://${dto.website}`,
    companyName: dto.company.name,
    // Regras de negócio simuladas baseadas no ID (para consistência visual)
    role: dto.id === 1 ? "ADMIN" : isEven ? "EDITOR" : "VIEWER",
    status: isEven ? "active" : "inactive",
    lastLogin: new Date(Date.now() - Math.random() * 10000000000), // Data aleatória recente
  };
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
  }

  const data: UserDTO[] = await response.json();

  // Transforma os dados antes de entregar para o componente
  return data.map(mapUserDtoToDomain);
};
