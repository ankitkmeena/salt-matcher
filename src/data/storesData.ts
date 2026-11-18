export interface JanAushadhiStore {
  id: string;
  name: string;
  kendra_code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp?: string;
  timings: string;
  latitude: number;
  longitude: number;
}

export const JAN_AUSHADHI_STORES: JanAushadhiStore[] = [
  {
    id: 'jas-del-001',
    name: 'Jan Aushadhi Kendra - AIIMS Campus',
    kendra_code: 'PMBJP-DL-1042',
    address: 'Near Gate No. 2, Sri Aurobindo Marg, Ansari Nagar East',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110029',
    phone: '+91 11 2658 8500',
    whatsapp: '919876543210',
    timings: '24 Hours Open',
    latitude: 28.5672,
    longitude: 77.2100
  },
  {
    id: 'jas-del-002',
    name: 'Jan Aushadhi Kendra - Connaught Place',
    kendra_code: 'PMBJP-DL-1088',
    address: 'Shop 14, Palika Bazar Underground Market, Near Gate 1',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 98112 34567',
    whatsapp: '919811234567',
    timings: '09:00 AM - 09:30 PM',
    latitude: 28.6315,
    longitude: 77.2167
  },
  {
    id: 'jas-del-003',
    name: 'Jan Aushadhi Kendra - Saket District Centre',
    kendra_code: 'PMBJP-DL-1120',
    address: 'Plot No. 4, Community Center, Behind Select Citywalk',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110017',
    phone: '+91 98991 22334',
    whatsapp: '919899122334',
    timings: '09:30 AM - 10:00 PM',
    latitude: 28.5284,
    longitude: 77.2191
  },
  {
    id: 'jas-bom-001',
    name: 'Jan Aushadhi Kendra - Dadar West',
    kendra_code: 'PMBJP-MH-2041',
    address: 'Near Dadar Railway Station, Senapati Bapat Marg',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400028',
    phone: '+91 22 2430 1122',
    whatsapp: '919820011223',
    timings: '08:00 AM - 10:00 PM',
    latitude: 19.0178,
    longitude: 72.8478
  },
  {
    id: 'jas-bom-002',
    name: 'Jan Aushadhi Kendra - KEM Hospital Area',
    kendra_code: 'PMBJP-MH-2075',
    address: 'Acharya Donde Marg, Parel East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400012',
    phone: '+91 22 2410 4455',
    whatsapp: '919820044556',
    timings: '24 Hours Open',
    latitude: 19.0028,
    longitude: 72.8428
  },
  {
    id: 'jas-blr-001',
    name: 'Jan Aushadhi Kendra - Victoria Hospital',
    kendra_code: 'PMBJP-KA-3012',
    address: 'Opposite Victoria Hospital Main Gate, Kalasipalya',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560002',
    phone: '+91 80 2670 1199',
    whatsapp: '919845011990',
    timings: '24 Hours Open',
    latitude: 12.9629,
    longitude: 77.5753
  },
  {
    id: 'jas-blr-002',
    name: 'Jan Aushadhi Kendra - Indiranagar 100ft Rd',
    kendra_code: 'PMBJP-KA-3055',
    address: '12th Main Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91 80 2520 8899',
    whatsapp: '919845088991',
    timings: '09:00 AM - 09:30 PM',
    latitude: 12.9719,
    longitude: 77.6412
  },
  {
    id: 'jas-hyd-001',
    name: 'Jan Aushadhi Kendra - NIMS Hospital',
    kendra_code: 'PMBJP-TG-4011',
    address: 'Punjagutta Main Road, Near NIMS Outpatient Wing',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500082',
    phone: '+91 40 2348 9000',
    whatsapp: '919849012345',
    timings: '24 Hours Open',
    latitude: 17.4239,
    longitude: 78.4526
  },
  {
    id: 'jas-chn-001',
    name: 'Jan Aushadhi Kendra - Rajiv Gandhi Govt Hospital',
    kendra_code: 'PMBJP-TN-5018',
    address: 'EVR Periyar Salai, Park Town, Near Central Station',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600003',
    phone: '+91 44 2530 5000',
    whatsapp: '919841023456',
    timings: '24 Hours Open',
    latitude: 13.0805,
    longitude: 80.2785
  },
  {
    id: 'jas-kol-001',
    name: 'Jan Aushadhi Kendra - Medical College Kolkata',
    kendra_code: 'PMBJP-WB-6014',
    address: '88 College Street, Near Central Metro Station',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700073',
    phone: '+91 33 2255 1600',
    whatsapp: '919830023456',
    timings: '08:30 AM - 10:00 PM',
    latitude: 22.5735,
    longitude: 88.3639
  },
  {
    id: 'jas-jai-001',
    name: 'Jan Aushadhi Kendra - SMS Hospital',
    kendra_code: 'PMBJP-RJ-7019',
    address: 'Opposite Dhanwantari OPD Block, JLN Marg',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302004',
    phone: '+91 141 256 0291',
    whatsapp: '919829012345',
    timings: '24 Hours Open',
    latitude: 26.8978,
    longitude: 75.8156
  },
  {
    id: 'jas-pun-001',
    name: 'Jan Aushadhi Kendra - Sassoon Hospital Area',
    kendra_code: 'PMBJP-MH-2104',
    address: 'Station Road, Near Pune Junction Station',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    phone: '+91 20 2612 8000',
    whatsapp: '919822012345',
    timings: '24 Hours Open',
    latitude: 18.5289,
    longitude: 73.8744
  }
];
