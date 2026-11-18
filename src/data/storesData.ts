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
  // --- DELHI NCR ---
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
    id: 'jas-del-004',
    name: 'Jan Aushadhi Kendra - Safdarjung Hospital OPD',
    kendra_code: 'PMBJP-DL-1015',
    address: 'Opposite OPD Registration Counter, Ring Road',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110029',
    phone: '+91 11 2616 5060',
    whatsapp: '919811029384',
    timings: '24 Hours Open',
    latitude: 28.5701,
    longitude: 77.2065
  },
  {
    id: 'jas-del-005',
    name: 'Jan Aushadhi Kendra - Karol Bagh Metro',
    kendra_code: 'PMBJP-DL-1156',
    address: 'Shop 8, Arya Samaj Road, Near Karol Bagh Metro Gate 2',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110005',
    phone: '+91 98711 22334',
    whatsapp: '919871122334',
    timings: '09:00 AM - 10:00 PM',
    latitude: 28.6472,
    longitude: 77.1912
  },
  {
    id: 'jas-del-006',
    name: 'Jan Aushadhi Kendra - Rohini Sector 7',
    kendra_code: 'PMBJP-DL-1204',
    address: 'Main Market, Naharpur Road, Sector 7 Rohini',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110085',
    phone: '+91 98104 55667',
    whatsapp: '919810455667',
    timings: '09:00 AM - 09:30 PM',
    latitude: 28.7056,
    longitude: 77.1190
  },
  {
    id: 'jas-del-007',
    name: 'Jan Aushadhi Kendra - Noida Sector 18',
    kendra_code: 'PMBJP-UP-5021',
    address: 'Atta Market, Pocket E, Near Sector 18 Metro Station',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    phone: '+91 120 422 1199',
    whatsapp: '919818811223',
    timings: '09:30 AM - 10:00 PM',
    latitude: 28.5708,
    longitude: 77.3261
  },
  {
    id: 'jas-del-008',
    name: 'Jan Aushadhi Kendra - Gurugram Civil Lines',
    kendra_code: 'PMBJP-HR-6012',
    address: 'Near Civil Hospital, Old Railway Road, Sadar Bazar',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001',
    phone: '+91 124 232 4455',
    whatsapp: '919812233445',
    timings: '08:30 AM - 09:30 PM',
    latitude: 28.4601,
    longitude: 77.0266
  },

  // --- MAHARASHTRA (Mumbai & Pune) ---
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
    id: 'jas-bom-003',
    name: 'Jan Aushadhi Kendra - Andheri East Station',
    kendra_code: 'PMBJP-MH-2110',
    address: 'Shop 5, Old Nagardas Road, Near Andheri East Station Flyover',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400069',
    phone: '+91 22 2684 3322',
    whatsapp: '919820077889',
    timings: '08:00 AM - 10:30 PM',
    latitude: 19.1197,
    longitude: 72.8468
  },
  {
    id: 'jas-bom-004',
    name: 'Jan Aushadhi Kendra - Thane West',
    kendra_code: 'PMBJP-MH-2144',
    address: 'Gokhale Road, Near Gaondevi Mandir, Naupada',
    city: 'Thane',
    state: 'Maharashtra',
    pincode: '400602',
    phone: '+91 22 2542 6677',
    whatsapp: '919820988776',
    timings: '09:00 AM - 10:00 PM',
    latitude: 19.1895,
    longitude: 72.9734
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
  },
  {
    id: 'jas-pun-002',
    name: 'Jan Aushadhi Kendra - Kothrud',
    kendra_code: 'PMBJP-MH-2189',
    address: 'Shop 3, Karve Road, Near Shivaji Statue, Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    phone: '+91 20 2545 1199',
    whatsapp: '919822055667',
    timings: '08:30 AM - 09:30 PM',
    latitude: 18.5074,
    longitude: 73.8077
  },

  // --- KARNATAKA (Bengaluru) ---
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
    id: 'jas-blr-003',
    name: 'Jan Aushadhi Kendra - Jayanagar 4th Block',
    kendra_code: 'PMBJP-KA-3092',
    address: 'Opposite Jayanagar Shopping Complex, 10th Main',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560011',
    phone: '+91 80 2663 4455',
    whatsapp: '919845122334',
    timings: '09:00 AM - 10:00 PM',
    latitude: 12.9299,
    longitude: 77.5833
  },
  {
    id: 'jas-blr-004',
    name: 'Jan Aushadhi Kendra - Malleshwaram 8th Cross',
    kendra_code: 'PMBJP-KA-3120',
    address: 'Near Margosa Road, 8th Cross, Malleshwaram',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560003',
    phone: '+91 80 2334 1122',
    whatsapp: '919845233445',
    timings: '08:30 AM - 09:30 PM',
    latitude: 13.0031,
    longitude: 77.5707
  },

  // --- TELANGANA (Hyderabad) ---
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
    id: 'jas-hyd-002',
    name: 'Jan Aushadhi Kendra - Gandhi Hospital',
    kendra_code: 'PMBJP-TG-4045',
    address: 'Musheerabad Main Road, Padmarao Nagar',
    city: 'Secunderabad',
    state: 'Telangana',
    pincode: '500003',
    phone: '+91 40 2750 5566',
    whatsapp: '919849098765',
    timings: '24 Hours Open',
    latitude: 17.4244,
    longitude: 78.5034
  },
  {
    id: 'jas-hyd-003',
    name: 'Jan Aushadhi Kendra - Kukatpally KPHB',
    kendra_code: 'PMBJP-TG-4098',
    address: 'Road No. 1, KPHB Colony, Near Metro Pillar 782',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500072',
    phone: '+91 40 2305 6677',
    whatsapp: '919849123456',
    timings: '09:00 AM - 10:00 PM',
    latitude: 17.4933,
    longitude: 78.3986
  },

  // --- TAMIL NADU (Chennai) ---
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
    id: 'jas-chn-002',
    name: 'Jan Aushadhi Kendra - T Nagar Ranganathan St',
    kendra_code: 'PMBJP-TN-5062',
    address: 'Shop 12, Usman Road, Near Panagal Park, T Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    phone: '+91 44 2434 2233',
    whatsapp: '919841055667',
    timings: '09:00 AM - 10:00 PM',
    latitude: 13.0418,
    longitude: 80.2341
  },
  {
    id: 'jas-chn-003',
    name: 'Jan Aushadhi Kendra - Tambaram Sanatorium',
    kendra_code: 'PMBJP-TN-5110',
    address: 'GST Road, Near Govt Hospital of Thoracic Medicine',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600047',
    phone: '+91 44 2241 8899',
    whatsapp: '919841088990',
    timings: '08:30 AM - 09:30 PM',
    latitude: 12.9342,
    longitude: 80.1280
  },

  // --- WEST BENGAL (Kolkata) ---
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
    id: 'jas-kol-002',
    name: 'Jan Aushadhi Kendra - SSKM Hospital',
    kendra_code: 'PMBJP-WB-6058',
    address: '244 AJC Bose Road, Bhowanipore, Near Rabindra Sadan',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700020',
    phone: '+91 33 2223 1589',
    whatsapp: '919830066778',
    timings: '24 Hours Open',
    latitude: 22.5392,
    longitude: 88.3444
  },
  {
    id: 'jas-kol-003',
    name: 'Jan Aushadhi Kendra - Salt Lake Sector 1',
    kendra_code: 'PMBJP-WB-6092',
    address: 'BD Block Market, Near Karunamoyee Bus Terminus',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700064',
    phone: '+91 33 2337 4455',
    whatsapp: '919830099887',
    timings: '09:00 AM - 09:30 PM',
    latitude: 22.5867,
    longitude: 88.4178
  },

  // --- RAJASTHAN (Jaipur, Jodhpur) ---
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
    id: 'jas-jai-002',
    name: 'Jan Aushadhi Kendra - Mansarovar Sector 5',
    kendra_code: 'PMBJP-RJ-7055',
    address: 'Shop 18, Madhyam Marg, Mansarovar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302020',
    phone: '+91 141 278 1122',
    whatsapp: '919829044556',
    timings: '08:30 AM - 10:00 PM',
    latitude: 26.8524,
    longitude: 75.7684
  },
  {
    id: 'jas-jod-001',
    name: 'Jan Aushadhi Kendra - AIIMS Jodhpur',
    kendra_code: 'PMBJP-RJ-7090',
    address: 'Basni Industrial Area, Phase II, Near Gate No 1',
    city: 'Jodhpur',
    state: 'Rajasthan',
    pincode: '342005',
    phone: '+91 291 274 0741',
    whatsapp: '919829088776',
    timings: '24 Hours Open',
    latitude: 26.2389,
    longitude: 73.0243
  },

  // --- GUJARAT (Ahmedabad, Surat) ---
  {
    id: 'jas-ahm-001',
    name: 'Jan Aushadhi Kendra - Civil Hospital Asarwa',
    kendra_code: 'PMBJP-GJ-8012',
    address: 'Near 1200 Bed Hospital Building, Asarwa',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380016',
    phone: '+91 79 2268 3721',
    whatsapp: '919879011223',
    timings: '24 Hours Open',
    latitude: 23.0525,
    longitude: 72.6028
  },
  {
    id: 'jas-ahm-002',
    name: 'Jan Aushadhi Kendra - Navrangpura',
    kendra_code: 'PMBJP-GJ-8048',
    address: 'Commerce Six Roads, Near Swastik Cross Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380009',
    phone: '+91 79 2640 4455',
    whatsapp: '919879044556',
    timings: '09:00 AM - 10:00 PM',
    latitude: 23.0373,
    longitude: 72.5524
  },
  {
    id: 'jas-sur-001',
    name: 'Jan Aushadhi Kendra - New Civil Hospital Surat',
    kendra_code: 'PMBJP-GJ-8085',
    address: 'Ring Road, Majura Gate',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395001',
    phone: '+91 261 224 4456',
    whatsapp: '919879077889',
    timings: '24 Hours Open',
    latitude: 21.1764,
    longitude: 72.8222
  },

  // --- UTTAR PRADESH (Lucknow, Kanpur) ---
  {
    id: 'jas-lko-001',
    name: 'Jan Aushadhi Kendra - KGMU Chowk',
    kendra_code: 'PMBJP-UP-5042',
    address: 'Shah Mina Road, Chowk, Near Trauma Centre Gate',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226003',
    phone: '+91 522 225 7450',
    whatsapp: '919839011223',
    timings: '24 Hours Open',
    latitude: 26.8683,
    longitude: 80.9157
  },
  {
    id: 'jas-lko-002',
    name: 'Jan Aushadhi Kendra - Hazratganj',
    kendra_code: 'PMBJP-UP-5088',
    address: 'Near Mayfair Cinema Building, Mahatma Gandhi Marg',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226001',
    phone: '+91 522 262 1199',
    whatsapp: '919839044556',
    timings: '09:30 AM - 09:30 PM',
    latitude: 26.8467,
    longitude: 80.9462
  },
  {
    id: 'jas-kan-001',
    name: 'Jan Aushadhi Kendra - GSVM Medical College',
    kendra_code: 'PMBJP-UP-5130',
    address: 'Swaroop Nagar, Near Hallet Hospital Gate',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    pincode: '208002',
    phone: '+91 512 253 5483',
    whatsapp: '919839088990',
    timings: '24 Hours Open',
    latitude: 26.4842,
    longitude: 80.3168
  },

  // --- MADHYA PRADESH (Bhopal, Indore) ---
  {
    id: 'jas-bho-001',
    name: 'Jan Aushadhi Kendra - AIIMS Bhopal',
    kendra_code: 'PMBJP-MP-9015',
    address: 'Saket Nagar, Near IPD Block, AIIMS Campus',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '462020',
    phone: '+91 755 267 2317',
    whatsapp: '919826011223',
    timings: '24 Hours Open',
    latitude: 23.2064,
    longitude: 77.4578
  },
  {
    id: 'jas-ind-001',
    name: 'Jan Aushadhi Kendra - MY Hospital Indore',
    kendra_code: 'PMBJP-MP-9052',
    address: 'MY Hospital Road, Sanyogitaganj',
    city: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '452001',
    phone: '+91 731 252 7383',
    whatsapp: '919826055667',
    timings: '24 Hours Open',
    latitude: 22.7144,
    longitude: 75.8753
  },

  // --- KERALA (Kochi, Thiruvananthapuram) ---
  {
    id: 'jas-koc-001',
    name: 'Jan Aushadhi Kendra - Ernakulam General Hospital',
    kendra_code: 'PMBJP-KL-1002',
    address: 'Hospital Road, Marine Drive, Near Subhash Park',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682011',
    phone: '+91 484 236 0015',
    whatsapp: '919847011223',
    timings: '08:00 AM - 10:00 PM',
    latitude: 9.9723,
    longitude: 76.2829
  },
  {
    id: 'jas-tvm-001',
    name: 'Jan Aushadhi Kendra - Medical College Trivandrum',
    kendra_code: 'PMBJP-KL-1045',
    address: 'Medical College PO, Ulloor Road',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    pincode: '695011',
    phone: '+91 471 252 8300',
    whatsapp: '919847055667',
    timings: '24 Hours Open',
    latitude: 8.5241,
    longitude: 76.9244
  },

  // --- PUNJAB & CHANDIGARH ---
  {
    id: 'jas-chd-001',
    name: 'Jan Aushadhi Kendra - PGIMER Chandigarh',
    kendra_code: 'PMBJP-PB-1102',
    address: 'Nehru Hospital Building, Sector 12',
    city: 'Chandigarh',
    state: 'Punjab & Chandigarh',
    pincode: '160012',
    phone: '+91 172 274 7837',
    whatsapp: '919814011223',
    timings: '24 Hours Open',
    latitude: 30.7634,
    longitude: 76.7766
  },
  {
    id: 'jas-ludh-001',
    name: 'Jan Aushadhi Kendra - Civil Hospital Ludhiana',
    kendra_code: 'PMBJP-PB-1145',
    address: 'Near Old Courts Road, Jail Road',
    city: 'Ludhiana',
    state: 'Punjab',
    pincode: '141001',
    phone: '+91 161 244 5566',
    whatsapp: '919814055667',
    timings: '08:30 AM - 09:30 PM',
    latitude: 30.9010,
    longitude: 75.8573
  },

  // --- BIHAR (Patna) ---
  {
    id: 'jas-pat-001',
    name: 'Jan Aushadhi Kendra - AIIMS Patna',
    kendra_code: 'PMBJP-BR-1205',
    address: 'Phulwari Sharif, Near OPD Complex Gate 2',
    city: 'Patna',
    state: 'Bihar',
    pincode: '801507',
    phone: '+91 612 245 1070',
    whatsapp: '919835011223',
    timings: '24 Hours Open',
    latitude: 25.5601,
    longitude: 85.0442
  },
  {
    id: 'jas-pat-002',
    name: 'Jan Aushadhi Kendra - PMCH Patna',
    kendra_code: 'PMBJP-BR-1240',
    address: 'Ashok Rajpath, Near Hathua Market, Muradpur',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800004',
    phone: '+91 612 230 0080',
    whatsapp: '919835055667',
    timings: '24 Hours Open',
    latitude: 25.6207,
    longitude: 85.1588
  }
];
