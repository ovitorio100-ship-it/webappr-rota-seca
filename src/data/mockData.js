export const weatherData = {
  temp: 27,
  condition: 'Chuva forte',
  humidity: 89,
  precipitation: '82mm nas próximas 3h',
  wind: '25 km/h'
};

export const floodPoints = [
  {
    id: 1,
    name: 'Av. Domingos Ferreira, Boa Viagem',
    level: 'GRAVE', // verde, amarelo, laranja, vermelho
    source: 'IoT', // IoT, IA, Usuário
    lat: -8.1130,
    lng: -34.8945,
    probability: 92,
  },
  {
    id: 2,
    name: 'Av. Abdias de Carvalho, Madalena',
    level: 'MODERADO',
    source: 'IA',
    lat: -8.0612,
    lng: -34.9145,
    probability: 0,
  },
  {
    id: 3,
    name: 'Rua da Aurora, Derby',
    level: 'GRAVE',
    source: 'IoT',
    lat: -8.0560,
    lng: -34.8810,
    probability: 0,
  },
  {
    id: 4,
    name: 'Av. Mascarenhas de Moraes, Imbiribeira',
    level: 'LEVE',
    source: 'Usuário',
    lat: -8.1020,
    lng: -34.9080,
    probability: 45,
  },
  {
    id: 5,
    name: 'Rua do Espinheiro, Espinheiro',
    level: 'MODERADO',
    source: 'IA',
    lat: -8.0435,
    lng: -34.8970,
    probability: 71,
  },
  {
    id: 6,
    name: 'Estrada do Arraial, Casa Amarela',
    level: 'LEVE',
    source: 'Usuário',
    lat: -8.0280,
    lng: -34.9120,
    probability: 0,
  }
];

export const mockAlerts = [
  {
    id: 1,
    title: 'ALERTA CRÍTICO',
    desc: 'Av. Domingos Ferreira alagada. Nível: Grave. Evite a região.',
    time: 'há 12 min',
    type: 'critical' // critical, warning, success, info
  },
  {
    id: 2,
    title: 'ATENÇÃO',
    desc: 'Chuva forte prevista para Madalena em 45 min.',
    time: 'há 28 min',
    type: 'warning'
  },
  {
    id: 3,
    title: 'LIBERADO',
    desc: 'Rua do Espinheiro normalizada. Trânsito fluindo.',
    time: 'há 1h',
    type: 'success'
  },
  {
    id: 4,
    title: 'ATENÇÃO',
    desc: 'Nível da água subindo na Rua da Aurora, Derby.',
    time: 'há 1h30',
    type: 'warning'
  },
  {
    id: 5,
    title: 'REPORTE',
    desc: 'Usuário confirmou alagamento na Av. Mascarenhas de Moraes.',
    time: 'há 2h',
    type: 'info'
  }
];

export const neighborhoodRanking = [
  { id: 1, name: 'Boa Viagem', count: 18, risk: '🔴 Crítico' },
  { id: 2, name: 'Madalena', count: 15, risk: '🔴 Crítico' },
  { id: 3, name: 'Derby', count: 13, risk: '🔴 Crítico' },
  { id: 4, name: 'Imbiribeira', count: 11, risk: '🟠 Alto' },
  { id: 5, name: 'Afogados', count: 9, risk: '🟠 Alto' },
  { id: 6, name: 'Espinheiro', count: 8, risk: '🟡 Moderado' },
  { id: 7, name: 'Casa Amarela', count: 7, risk: '🟡 Moderado' },
  { id: 8, name: 'Ibura', count: 6, risk: '🟡 Moderado' },
  { id: 9, name: 'Encruzilhada', count: 4, risk: '🟢 Baixo' },
  { id: 10, name: 'Casa Forte', count: 2, risk: '🟢 Baixo' },
];

export const userData = {
  name: 'Vitório Oliveira',
  initials: 'VO',
  neighborhood: 'Boa Viagem, Recife',
  stats: {
    avoided: 14,
    reports: 4,
    savedTime: 45
  },
  routes: [
    { id: 1, name: 'Casa → Trabalho' },
    { id: 2, name: 'Casa → Faculdade' }
  ]
};
