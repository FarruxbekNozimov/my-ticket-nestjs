const fs = require('fs');
const path = require('path');

function makeFiles(
  folderName: string,
  name: string,
  columns: object,
  hasMany: object = {},
  createDto: object = {},
  updateDto: object = {},
  connect: object = {},
) {
  createDto =
    Object.keys(createDto).length === 0
      ? Object.fromEntries(Object.entries(columns).map((i) => [i[0], i[1][0]]))
      : createDto;

  // ALL FUNCTIONS
  let mkDir = path.resolve(__dirname, '..', '..', folderName);
  let readFromExample = (name: string) => {
    return fs
      .readFileSync(path.resolve(__dirname, 'example', name), 'utf8')
      .toString();
  };
  let replaceName = (content: string) => {
    let splitContent = content.split('\n');
    for (let i in splitContent) {
      if (
        splitContent[i].includes('import') ||
        splitContent[i].includes('from')
      ) {
        splitContent[i] = splitContent[i].replace(
          /example./g,
          folderName + '.',
        );
      }
    }
    content = splitContent.join('\n');
    content = content
      .replace(/@Table/, `@Table({ tableName: '${folderName}' })`)
      .replace(/@Controller/, `@Controller('${folderName}')`)
      .replace(/example/g, name[0].toLowerCase() + name.slice(1, name.length))
      .replace(/Example/g, name);
    return content;
  };

  let writeProps = (content: string) => {
    let propsArea: string = '';
    let attrArea: string = '';
    for (let i in columns) {
      if (!columns[i][2]) {
        propsArea += `@Column(${columns[i][1]})\n\t${i}:${columns[i][0]};\n\n\t`;
      } else {
        let file = columns[i][2].column.replace('_', '-');
        content =
          `import { ${columns[i][2].name} } from "../../${file}/models/${file}.model";\n` +
          content;
        propsArea += `@ForeignKey(() => ${columns[i][2].name})\n\t@Column(${columns[i][1]})\n\t${i}: number;\n\t@BelongsTo(() => ${columns[i][2].name})\n\t${columns[i][2].column}: ${columns[i][2].name}[];\n\n\t`;
      }
      attrArea += `${i}:${columns[i][0]}\n\t`;
    }
    let hasManyImports: string = '';
    let hasManies: string = '';
    if (hasMany) {
      for (let j in hasMany) {
        hasManyImports += `import { ${j} } from '../../${hasMany[j].replace(
          /_/g,
          '-',
        )}/models/${hasMany[j].replace(/_/g, '-')}.model';\n`;
        hasManies += `@HasMany(() => ${j})\n\t${hasMany[j]}: ${j}[];\n\n\t`;
      }
    }
    content = hasManyImports + content;
    return content
      .replace(/'column'/, propsArea + hasManies)
      .replace(/'attr'/, attrArea);
  };

  let writeCreateDto = (content: string) => {
    let propsArea: string = '';
    for (let i in createDto) {
      propsArea += `${i}: ${createDto[i]};\n\t`;
    }
    return content.replace(/'dto'/, propsArea);
  };

  let writeUpdateDto = (content: string) => {
    let propsArea: string = '';
    let dto = Object.keys(updateDto).length === 0 ? updateDto : createDto;
    for (let i in dto) {
      propsArea += `${i}?: ${dto[i]};\n\t`;
    }
    return content.replace(/'dto'/, propsArea);
  };

  // FUNTIONS END

  try {
    fs.mkdirSync(mkDir);
  } catch (error) {
    console.log('Folder is already created.');
  }
  let controller = readFromExample('example.controller.ts');
  let module = readFromExample('example.module.ts');
  let service = readFromExample('example.service.ts');
  let model = readFromExample('models/example.model.ts');
  let createDtoFile = readFromExample('dto/create-example.dto.ts');
  let updateDtoFile = readFromExample('dto/update-example.dto.ts');

  // CREATE CONTROLLER FILE
  try {
    fs.writeFileSync(
      mkDir + `/${folderName}.controller.ts`,
      replaceName(controller),
    );
    console.log('Controller created');
  } catch (error) {
    console.log('Controllerda Yozishda xatolik');
  }

  // CREATE SERVICE FILE
  try {
    fs.writeFileSync(mkDir + `/${folderName}.service.ts`, replaceName(service));
    console.log('Service created');
  } catch (error) {
    console.log('Service Yozishda xatolik');
  }

  // CREATE MODULE FILE
  try {
    fs.writeFileSync(mkDir + `/${folderName}.module.ts`, replaceName(module));
    console.log('Module created');
  } catch (error) {
    console.log('Module Yozishda xatolik');
  }

  // CREATE MODEL
  try {
    try {
      fs.mkdirSync(mkDir + '/models');
      console.log('Model created');
    } catch (error) {
      console.log('Model Papka oldin bor edi.');
    }
    fs.writeFileSync(
      mkDir + `/models/${folderName}.model.ts`,
      writeProps(replaceName(model)),
    );
    console.log('Model created');
  } catch (error) {
    console.log('Model Yozishda xatolik');
  }

  // CREATE DTO FOLDER
  try {
    fs.mkdirSync(mkDir + '/dto');
    console.log('Dto created');
  } catch (error) {
    console.log('Dto Papka oldin bor edi.');
  }

  // CREATE CREATEDTO FILE
  try {
    fs.writeFileSync(
      mkDir + `/dto/create-${folderName}.dto.ts`,
      writeCreateDto(replaceName(createDtoFile)),
    );
    console.log('CreateDto created');
  } catch (error) {
    console.log('CreateDto Yozishda xatolik');
  }

  // CREATE UPDATEDTO FILE
  try {
    fs.writeFileSync(
      mkDir + `/dto/update-${folderName}.dto.ts`,
      writeUpdateDto(replaceName(updateDtoFile)),
    );
    console.log('UpdateDto created');
  } catch (error) {
    console.log('UpdateDto Yozishda xatolik');
  }
}

// CUSTOMER
makeFiles(
  'customer',
  'Customer',
  {
    name: ['string', '{ type: DataType.STRING }'],
    first_name: ['string', '{ type: DataType.STRING }'],
    last_name: ['string', '{ type: DataType.STRING }'],
    phone: ['string', '{ type: DataType.STRING }'],
    hashed_password: ['string', '{ type: DataType.STRING }'],
    email: ['string', '{ type: DataType.STRING }'],
    birth_date: ['string', '{ type: DataType.STRING }'],
    gender: ['string', '{ type: DataType.STRING }'],
    lang_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Lang', column: 'lang' },
    ],
    hashed_refresh_token: ['string', '{ type: DataType.STRING }'],
  },
  {
    CustomerCard: 'customer_card',
    CustomerAddress: 'customer_address',
    Cart: 'cart',
  },
);

// VENUE
makeFiles(
  'venue',
  'Venue',
  {
    name: ['string', '{ type: DataType.STRING }'],
    address: ['string', '{ type: DataType.STRING }'],
    location: ['string', '{ type: DataType.STRING }'],
    site: ['string', '{ type: DataType.STRING }'],
    phone: ['string', '{ type: DataType.STRING }'],
    venue_type_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'VenueType', column: 'venue_type' },
    ],
    schema: ['string', '{ type: DataType.STRING }'],
    region_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Region', column: 'region' },
    ],
    district_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'District', column: 'district' },
    ],
  },
  { VenuePhoto: 'venue_photo', Seat: 'seat', Event: 'event' },
);

// VENUE PHOTO
makeFiles('venue-photo', 'VenuePhoto', {
  venue_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'Venue', column: 'venue' },
  ],
  url: ['string', '{ type: DataType.STRING }'],
});

// DISTRICT
makeFiles(
  'district',
  'District',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Venue: 'venue', CustomerAddress: 'customer_address' },
);

// REGION
makeFiles(
  'region',
  'Region',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Venue: 'venue', CustomerAddress: 'customer_address' },
);

// SEAT TYPE
makeFiles(
  'seat-type',
  'SeatType',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Seat: 'seat' },
);

// SEAT
makeFiles(
  'seat',
  'Seat',
  {
    sector: ['number', '{ type: DataType.INTEGER }'],
    row_number: ['number', '{ type: DataType.INTEGER }'],
    venue_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Venue', column: 'venue' },
    ],
    seat_type_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'SeatType', column: 'seat_type' },
    ],
    location_in_schema: ['string', '{ type: DataType.STRING }'],
  },
  { Ticket: 'ticket' },
);

// TICKET
makeFiles(
  'ticket',
  'Ticket',
  {
    event_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Event', column: 'event' },
    ],
    seat_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Seat', column: 'seat' },
    ],
    price: ['number', '{ type: DataType.INTEGER }'],
    service_free: ['number', '{ type: DataType.INTEGER }'],
    status_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Status', column: 'status' },
    ],
    ticket_type: ['number', '{ type: DataType.INTEGER }'],
  },
  { Cart: 'cart' },
);

// CART
makeFiles(
  'cart',
  'Cart',
  {
    ticket_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Ticket', column: 'ticket' },
    ],
    customer_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Customer', column: 'customer' },
    ],
    status_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Status', column: 'status' },
    ],
  },
  { Booking: 'booking' },
);

// BOOKING
makeFiles('booking', 'Booking', {
  cart_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'Cart', column: 'cart' },
  ],
  payment_method_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'PaymentMethod', column: 'payment_method' },
  ],
  delivery_method_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'DeliveryMethod', column: 'delivery_method' },
  ],
  discount_coupon_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'DiscountCoupon', column: 'discount_coupon' },
  ],
  status_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'Status', column: 'status' },
  ],
});

// PAYMENT METHOD
makeFiles(
  'payment-method',
  'PaymentMethod',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Booking: 'booking' },
);

// DELIVERY METHOD
makeFiles(
  'delivery-method',
  'DeliveryMethod',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Booking: 'booking' },
);

// DISCOUNT COUPON
makeFiles(
  'discount-coupon',
  'DiscountCoupon',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Booking: 'booking' },
);

// EVENT
makeFiles(
  'event',
  'Event',
  {
    name: ['string', '{ type: DataType.STRING }'],
    photo: ['string', '{ type: DataType.STRING }'],
    start_date: ['Date', '{ type: DataType.DATE }'],
    start_time: ['Date', '{ type: DataType.DATE }'],
    finish_date: ['Date', '{ type: DataType.DATE }'],
    finish_time: ['Date', '{ type: DataType.DATE }'],
    info: ['Date', '{ type: DataType.DATE }'],
    event_type_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'EventType', column: 'event_type' },
    ],
    human_category_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'HumanCategory', column: 'human_category' },
    ],
    venue_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Venue', column: 'venue' },
    ],
    lang_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'Lang', column: 'lang' },
    ],
    release_date: ['number', '{ type: DataType.INTEGER }'],
  },
  { Ticket: 'ticket' },
);

// EVENT TYPE
makeFiles(
  'event-type',
  'EventType',
  {
    name: ['string', '{ type: DataType.STRING }'],
    parent_event_type_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'EventType', column: 'event_type' },
    ],
  },
  { Event: 'event' },
);

// VENUE TYPE
makeFiles(
  'venue-type',
  'VenueType',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Venue: 'venue' },
);

// HUMAN CATEGORY
makeFiles(
  'human-category',
  'HumanCategory',
  {
    name: ['string', '{ type: DataType.STRING }'],
    start_age: ['number', '{ type: DataType.INTEGER }'],
    finish_age: ['number', '{ type: DataType.INTEGER }'],
  },
  { Event: 'event' },
);

// LANG
makeFiles(
  'lang',
  'Lang',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Event: 'event', Customer: 'customer' },
);

// CUSTOMER CARD
makeFiles('customer-card', 'CustomerCard', {
  customer_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'Customer', column: 'customer' },
  ],
  name: ['string', '{ type: DataType.STRING }'],
  phone: ['string', '{ type: DataType.STRING }'],
  number: ['string', '{ type: DataType.STRING }'],
  year: ['string', '{ type: DataType.STRING }'],
  month: ['string', '{ type: DataType.STRING }'],
  is_active: ['boolean', '{ type: DataType.BOOLEAN }'],
  is_main: ['boolean', '{ type: DataType.BOOLEAN }'],
});

// CUSTOMER ADDRESS
makeFiles('customer-address', 'CustomerAddress', {
  customer_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'Customer', column: 'customer' },
  ],
  name: ['string', '{ type: DataType.STRING }'],
  country_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'Country', column: 'country' },
  ],
  region_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'Region', column: 'region' },
  ],
  district_id: [
    'number',
    '{ type: DataType.INTEGER }',
    { name: 'District', column: 'district' },
  ],
  street: ['string', '{ type: DataType.STRING }'],
  house: ['string', '{ type: DataType.STRING }'],
  flat: ['number', '{ type: DataType.INTEGER }'],
  location: ['string', '{ type: DataType.STRING }'],
  post_index: ['string', '{ type: DataType.STRING }'],
  info: ['string', '{ type: DataType.STRING }'],
});

// COUNTRY
makeFiles(
  'country',
  'Country',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { CustomerAddress: 'customer_address' },
);

// ADMIN
makeFiles('admin', 'Admin', {
  name: ['string', '{ type: DataType.STRING }'],
  login: ['string', '{ type: DataType.STRING }'],
  hashed_password: ['string', '{ type: DataType.STRING }'],
  is_active: ['boolean', '{ type: DataType.BOOLEAN }'],
  is_creator: ['boolean', '{ type: DataType.BOOLEAN }'],
  hashed_refresh_token: ['string', '{ type: DataType.STRING }'],
});

// STATUS
makeFiles(
  'status',
  'Status',
  {
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Booking: 'booking', Ticket: 'ticket', Cart: 'cart' },
);
