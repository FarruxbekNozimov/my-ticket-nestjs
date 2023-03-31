import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';
import { Booking } from './booking/models/booking.model';
import { Cart } from './cart/models/cart.model';
import { Country } from './country/models/country.model';
import { Customer } from './customer/models/customer.model';
import { CustomerAddress } from './customer-address/models/customer-address.model';
import { CustomerCard } from './customer-card/models/customer-card.model';
import { DeliveryMethod } from './delivery-method/models/delivery-method.model';
import { DiscountCoupon } from './discount-coupon/models/discount-coupon.model';
import { District } from './district/models/district.model';
import { Event } from './event/models/event.model';
import { EventType } from './event-type/models/event-type.model';
import { HumanCategory } from './human-category/models/human-category.model';
import { Lang } from './lang/models/lang.model';
import { PaymentMethod } from './payment-method/models/payment-method.model';
import { Region } from './region/models/region.model';
import { Seat } from './seat/models/seat.model';
import { SeatType } from './seat-type/models/seat-type.model';
import { Status } from './status/models/status.model';
import { Ticket } from './ticket/models/ticket.model';
import { Venue } from './venue/models/venue.model';
import { VenuePhoto } from './venue-photo/models/venue-photo.model';
import { VenueType } from './venue-type/models/venue-type.model';
import { AdminModule } from './admin/admin.module';
import { BookingModule } from './booking/booking.module';
import { CartModule } from './cart/cart.module';
import { CountryModule } from './country/country.module';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { CustomerCardModule } from './customer-card/customer-card.module';
import { DeliveryMethodModule } from './delivery-method/delivery-method.module';
import { DiscountCouponModule } from './discount-coupon/discount-coupon.module';
import { DistrictModule } from './district/district.module';
import { EventTypeModule } from './event-type/event-type.module';
import { EventModule } from './event/event.module';
import { HumanCategoryModule } from './human-category/human-category.module';
import { LangModule } from './lang/lang.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { RegionModule } from './region/region.module';
import { SeatTypeModule } from './seat-type/seat-type.module';
import { SeatModule } from './seat/seat.module';
import { StatusModule } from './status/status.module';
import { TicketModule } from './ticket/ticket.module';
import { VenuePhotoModule } from './venue-photo/venue-photo.module';
import { VenueTypeModule } from './venue-type/venue-type.module';
import { VenueModule } from './venue/venue.module';
import { TicketType } from './ticket-type/models/ticket-type.model';
import { TicketTypeModule } from './ticket-type/ticket-type.module';
import { AuthModule } from './auth/auth.module';
import { FinishAge } from './finish-age/models/finish-age.model';
import { Flat } from './flat/models/flat.model';
import { Gender } from './gender/models/gender.model';
import { Sector } from './sector/models/sector.model';
import { StartAge } from './start-age/models/start-age.model';
import { RowNumber } from './row-number/models/row-number.model';
import { RowNumberModule } from './row-number/row-number.module';
import { FinishAgeModule } from './finish-age/finish-age.module';
import { FlatModule } from './flat/flat.module';
import { GenderModule } from './gender/gender.module';
import { SectorModule } from './sector/sector.module';
import { StartAgeModule } from './start-age/start-age.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Booking,
        Cart,
        Country,
        Customer,
        CustomerAddress,
        CustomerCard,
        DeliveryMethod,
        DiscountCoupon,
        District,
        Event,
        EventType,
        HumanCategory,
        Lang,
        PaymentMethod,
        Region,
        Seat,
        SeatType,
        Status,
        Ticket,
        Venue,
        VenuePhoto,
        VenueType,
        TicketType,
        FinishAge,
        Flat,
        Gender,
        RowNumber,
        Sector,
        StartAge,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    CustomerModule,
    AdminModule,
    BookingModule,
    CartModule,
    CountryModule,
    CustomerModule,
    CustomerAddressModule,
    CustomerCardModule,
    DeliveryMethodModule,
    DiscountCouponModule,
    DistrictModule,
    EventModule,
    EventTypeModule,
    HumanCategoryModule,
    LangModule,
    PaymentMethodModule,
    RegionModule,
    SeatModule,
    SeatTypeModule,
    StatusModule,
    TicketModule,
    VenueModule,
    VenuePhotoModule,
    VenueTypeModule,
    TicketTypeModule,
    AuthModule,
    RowNumberModule,
    FinishAgeModule,
    FlatModule,
    GenderModule,
    SectorModule,
    StartAgeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
