// Mock data for Vyra Drive App prototype

export const driverProfile = {
  id: 'DRV-1042',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  avatar: null,
  vehicleNumber: 'MH 04 BX 7823',
  vehicleType: 'Maruti Suzuki Ertiga CNG',
  shiftType: 'morning', // 'morning' | 'evening'
  rating: 4.7,
  daysActive: 24,
  fleetOwner: 'Sharma Fleet Services',
};

export const currentShift = {
  type: 'morning',
  start: '06:00 AM',
  end: '03:00 PM',
  status: 'active', // 'upcoming' | 'active' | 'completed' | 'overtime'
  checkedIn: true,
  checkInTime: '05:55 AM',
  checkInLocation: 'Andheri East Depot',
  overtimeMinutes: 0,
  handoverTo: 'Suresh Patil',
  handoverStatus: 'pending',
  nextCheckIn: '10:00 AM',
  hoursWorked: 5.5,
};

export const todayStats = {
  totalTrips: 8,
  totalKm: 127.4,
  totalEarnings: 2340,
  onlineHours: 5.5,
  acceptanceRate: 87,
  avgRating: 4.8,
  fuelUsed: 5.8,
  efficiency: 21.9, // km/kg
};

export const weeklyEarnings = {
  basePay: 1800,
  kmIncentive: 1890, // 2700km * 0.70
  qualityBonus: 300,
  attendanceBonus: 500,
  fuelBonus: 200,
  totalKm: 2700,
  totalTrips: 58,
  daysWorked: 6,
  deductions: 150,
  netPayout: 4540,
  payoutDate: 'Sunday, Jan 26',
};

export const earningsHistory = [
  { day: 'Mon', earnings: 2100, trips: 9, km: 145 },
  { day: 'Tue', earnings: 2450, trips: 11, km: 162 },
  { day: 'Wed', earnings: 1890, trips: 7, km: 118 },
  { day: 'Thu', earnings: 2670, trips: 12, km: 178 },
  { day: 'Fri', earnings: 2340, trips: 8, km: 127 },
  { day: 'Sat', earnings: 2890, trips: 14, km: 195 },
  { day: 'Sun', earnings: 0, trips: 0, km: 0 },
];

export const recentTrips = [
  {
    id: 'T-2401',
    platform: 'Uber',
    pickup: 'Andheri Station',
    dropoff: 'Bandra Kurla Complex',
    fare: 320,
    distance: 12.4,
    duration: 38,
    status: 'completed',
    time: '2:15 PM',
    rating: 5,
  },
  {
    id: 'T-2400',
    platform: 'Ola',
    pickup: 'Juhu Beach',
    dropoff: 'Powai Lake',
    fare: 450,
    distance: 18.2,
    duration: 52,
    status: 'completed',
    time: '1:05 PM',
    rating: 4,
  },
  {
    id: 'T-2399',
    platform: 'Corporate',
    pickup: 'TCS Olympus, Ghansoli',
    dropoff: 'Bandra Terminus',
    fare: 580,
    distance: 24.1,
    duration: 65,
    status: 'completed',
    time: '11:30 AM',
    rating: 5,
  },
  {
    id: 'T-2398',
    platform: 'Uber',
    pickup: 'Dadar TT Circle',
    dropoff: 'Lower Parel',
    fare: 180,
    distance: 5.2,
    duration: 22,
    status: 'completed',
    time: '10:45 AM',
    rating: 5,
  },
  {
    id: 'T-2397',
    platform: 'Ola',
    pickup: 'Vile Parle Station',
    dropoff: 'Santa Cruz Airport T2',
    fare: 210,
    distance: 7.8,
    duration: 25,
    status: 'completed',
    time: '9:20 AM',
    rating: 4,
  },
];

export const rideOpportunities = [
  { id: 1, platform: 'Uber', time: '2:45 PM', pickup: 'Worli Sea Face', fare: 280, action: 'missed', reason: 'timeout' },
  { id: 2, platform: 'Ola', time: '2:30 PM', pickup: 'Dadar Station', fare: 350, action: 'rejected', reason: 'too_far' },
  { id: 3, platform: 'Uber', time: '2:15 PM', pickup: 'Andheri Station', fare: 320, action: 'accepted', reason: null },
  { id: 4, platform: 'Ola', time: '1:45 PM', pickup: 'BKC', fare: 190, action: 'accepted', reason: null },
  { id: 5, platform: 'Uber', time: '1:20 PM', pickup: 'Juhu Circle', fare: 410, action: 'accepted', reason: null },
  { id: 6, platform: 'Ola', time: '12:50 PM', pickup: 'Powai Hiranandani', fare: 520, action: 'accepted', reason: null },
];

export const expenses = [
  { id: 1, type: 'fuel', amount: 850, date: 'Today', description: 'CNG Fill - 12.5 kg', odometer: 45230, verified: true },
  { id: 2, type: 'toll', amount: 75, date: 'Today', description: 'Bandra-Worli Sea Link', odometer: null, verified: true },
  { id: 3, type: 'parking', amount: 50, date: 'Yesterday', description: 'BKC Parking', odometer: null, verified: true },
  { id: 4, type: 'fuel', amount: 900, date: 'Yesterday', description: 'CNG Fill - 13.2 kg', odometer: 45102, verified: true },
  { id: 5, type: 'repair', amount: 1200, date: '2 days ago', description: 'Tyre puncture repair', odometer: null, verified: false },
];

export const fuelLog = [
  { id: 1, date: 'Today', kg: 12.5, cost: 850, odometer: 45230, efficiency: 22.1 },
  { id: 2, date: 'Yesterday', kg: 13.2, cost: 900, odometer: 45102, efficiency: 21.4 },
  { id: 3, date: '2 days ago', kg: 11.8, cost: 802, odometer: 44820, efficiency: 23.2 },
  { id: 4, date: '3 days ago', kg: 14.0, cost: 952, odometer: 44546, efficiency: 20.8 },
];

export const messages = [
  { id: 1, from: 'Fleet Admin', time: '2:30 PM', message: 'Reminder: Vehicle service due next week.', read: false },
  { id: 2, from: 'Sharma Ji', time: '11:00 AM', message: 'Great job this week! Keep up the ratings.', read: true },
  { id: 3, from: 'Fleet Admin', time: 'Yesterday', message: 'Corporate duty scheduled for tomorrow 8 AM pickup.', read: true },
  { id: 4, from: 'System', time: 'Yesterday', message: 'Weekly payout of ₹4,540 has been processed.', read: true },
];

export const corporateDuties = [
  { id: 1, company: 'TCS', pickup: 'Ghansoli Office', time: '8:00 AM', employees: 3, status: 'completed' },
  { id: 2, company: 'Infosys', pickup: 'Hinjewadi Phase 2', time: '9:30 AM', employees: 2, status: 'upcoming' },
];

export const safetyCheckins = [
  { time: '8:00 AM', status: 'completed' },
  { time: '10:00 AM', status: 'completed' },
  { time: '12:00 PM', status: 'due' },
  { time: '2:00 PM', status: 'upcoming' },
];
