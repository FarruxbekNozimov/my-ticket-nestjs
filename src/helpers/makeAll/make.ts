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
      ? createDto
      : Object.fromEntries(Object.entries(columns).map((i) => [i[0], i[1][0]]));
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
    console.log(content.replace(/@/, `@Table({ tableName: '${name}' })`));
    content = content
      .replace(/@Table/, `@Table({ tableName: '${name}' })`)
      .replace(/@Controller('example')/, `@Controller('${name}')`)
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
        hasManies += `@HasMany(() => ${j})\n\t${hasMany[j]}: ${j}[];\n`;
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
    let dto = updateDto || createDto;
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

// VENUE
makeFiles('venue', 'Venue', {
  id: [
    'number',
    '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
  ],
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
});

// DISTRICT
makeFiles(
  'district',
  'District',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Venue: 'venue' },
);

// REGION
makeFiles(
  'region',
  'Region',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Venue: 'venue' },
);

// SEAT TYPE
makeFiles(
  'seat-type',
  'SeatType',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Seat: 'seat' },
);

// SEAT
makeFiles(
  'seat',
  'Seat',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
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
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
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
    status: ['number', '{ type: DataType.INTEGER }'],
    ticket_type: ['number', '{ type: DataType.INTEGER }'],
  },
  { Cart: 'cart' },
);

// CART
makeFiles(
  'cart',
  'Cart',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
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
  id: [
    'number',
    '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
  ],
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
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Booking: 'booking', Cart: 'cart', Ticket: 'ticket' },
);

// DELIVERY METHOD
makeFiles(
  'delivery-method',
  'DeliveryMethod',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Booking: 'booking' },
);

// DISCOUNT COUPON
makeFiles(
  'discount-coupon',
  'DiscountCoupon',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Booking: 'booking' },
);

// EVENT
makeFiles(
  'event',
  'Event',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
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
      { name: 'EventType', column: 'eventType' },
    ],
    human_category_id: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'HumanCategory', column: 'human' },
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
    release_date: [
      'number',
      '{ type: DataType.INTEGER }',
      { name: 'ReleaseDate', column: 'release_date' },
    ],
  },
  { Ticket: 'ticket' },
);

// EVENT TYPE
makeFiles(
  'event-type',
  'EventType',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
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
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
  },
  { Venue: 'venue' },
);

// HUMAN CATEGORY
makeFiles(
  'human-category',
  'HumanCategory',
  {
    id: [
      'number',
      '{ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }',
    ],
    name: ['string', '{ type: DataType.STRING }'],
    start_age: ['number', '{ type: DataType.INTEGER }'],
    finish_age: ['number', '{ type: DataType.INTEGER }'],
  },
  { Venue: 'venue' },
);
