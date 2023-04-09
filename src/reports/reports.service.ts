import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Catagory } from 'src/catagories/entities/catagory.entity';
import { Material } from 'src/materials/entities/material.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class ReportsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Catagory)
    private categoryRepository: Repository<Catagory>,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  getProduct() {
    return this.dataSource.query('SELECT * FROM product');
  }

  getProductBySearchText(searchText: any) {
    return this.dataSource.query(
      'SELECT * FROM product WHERE product_name LIKE "%' + searchText + '%"',
    );
  }

  getMaterial() {
    return this.dataSource.query('SELECT * FROM material');
  }

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  getMaterialByUnit(unit: string) {
    return this.dataSource.query(
      'SELECT * FROM material WHERE mat_unit LIKE "%' + unit + '%"',
    );
  }

  async calledStoreGetProduct() {
    const products = await this.dataSource.query('CALL getProduct()');
    const productList = new Array<Product>();
    for (const product_ of products[0]) {
      const product = new Product();
      const cat = await this.categoryRepository.findOne({
        where: { id: product_.catagoryId },
      });
      product.id = product_.product_id;
      product.name = product_.product_name;
      product.type = product_.product_type;
      product.size = product_.product_size;
      product.price = product_.product_price;
      product.image = product_.image;
      product.createdAt = product_.createdAt;
      product.updatedAt = product_.updatedAt;
      product.catagory = cat;
      productList.push(product);
    }
    return productList;
  }
  async testRegXData(store: Store) {
    const address = store.address.toString();
    console.log(address);
    const road_ = /(\b[A-Z][a-z]+)\sRoad\b/;
    const dis_ = /(\b[A-Z][a-z]+)\sDistrict\b/;
    const subDis_ =
      /(\b[A-Z][a-z]+)\sSub-district\b/ || /(\b[A-Z][a-z]+)\sSubdistrict\b/;
    const province_ = /(\b[A-Z][a-z]+)\sProvince\b/;
    const rode = road_.exec(address);
    const dis = dis_.exec(address);
    const subDis = subDis_.exec(address);
    const province = province_.exec(address);
    const region = '';
    const Addes = {
      road: '',
      province: '',
      region: '',
      subDistrict: '',
      District: '',
      storeId: store.id,
      name: store.name,
    };
    if (rode === null) {
      Addes.road = '';
    }
    if (province === null) {
      Addes.province = '';
    }
    if (dis === null) {
      Addes.District = '';
    }
    if (subDis === null) {
      Addes.subDistrict = '';
    }
    //*
    if (rode !== null) {
      Addes.road = rode[1];
    }
    if (province !== null) {
      Addes.province = province[1];
    }
    if (dis !== null) {
      Addes.District = dis[1];
    }
    if (subDis !== null) {
      Addes.subDistrict = subDis[1];
    }

    if (
      Addes.province.toLowerCase() === 'ChiangRai'.toLowerCase() ||
      Addes.province.toLowerCase() === 'ChiangMai'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Nan'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phayao'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phrae'.toLowerCase() ||
      Addes.province.toLowerCase() === 'MaeHongSon'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Lampang'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Lamphun'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Uttaradit'.toLowerCase()
    ) {
      Addes.region = 'Northern';
      console.log('Northern');
    }

    if (
      Addes.province.toLowerCase() === 'Bangkok'.toLowerCase() ||
      Addes.province.toLowerCase() === 'KamphaengPhet'.toLowerCase() ||
      Addes.province.toLowerCase() === 'ChaiNat'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NakhonNayok'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NakhonPathom'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NakhonSawan'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Nonthaburi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'PathumThani'.toLowerCase() ||
      Addes.province.toLowerCase() === 'PhraNakhonSiAyutthaya'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phichit'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phitsanulok'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phetchabun'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Lopburi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SamutPrakan'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SamutSakhon'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SingBuri'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Sukhothai'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SuphanBuri'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Saraburi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'AngThong'.toLowerCase() ||
      Addes.province.toLowerCase() === 'UthaiThani'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SamutPrakan'.toLowerCase()
    ) {
      Addes.region = 'Central';
      console.log('Central');
    }

    if (
      Addes.province.toLowerCase() === 'Kalasin'.toLowerCase() ||
      Addes.province.toLowerCase() === 'KhonKaen'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Chaiyaphum'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NakhonPhanom'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NakhonRatchasima'.toLowerCase() ||
      Addes.province.toLowerCase() === 'BuengKan'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Buriram'.toLowerCase() ||
      Addes.province.toLowerCase() === 'MahaSarakham'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Mukdahan'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Yasothon'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Roiet'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SakonNakhon'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Surin'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Sisaket'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NongKhai'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NongBuaLamphu'.toLowerCase() ||
      Addes.province.toLowerCase() === 'UdonThani'.toLowerCase() ||
      Addes.province.toLowerCase() === 'UbonRatchathani'.toLowerCase() ||
      Addes.province.toLowerCase() === 'AmnatCharoen'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Buriram'.toLowerCase()
    ) {
      Addes.region = 'Northeastern';
      console.log('Northeastern');
    }

    if (
      Addes.province.toLowerCase() === 'Chanthaburi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Chachoengsao'.toLowerCase() ||
      Addes.province.toLowerCase() === 'จังหวัดชลบุรี'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Trat'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Prachinburi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Rayong'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SaKaeo'.toLowerCase()
    ) {
      Addes.region = 'Eastern';
      console.log('Eastern');
    }

    if (
      Addes.province.toLowerCase() === 'Kanchanaburi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Tak'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Prachuap'.toLowerCase() ||
      Addes.province.toLowerCase() === 'KhiriKhan'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phetchaburi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Ratchaburi'.toLowerCase()
    ) {
      Addes.region = 'Western';
      console.log('Western');
    }

    if (
      Addes.province.toLowerCase() === 'Krabi'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Chumphon'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Trang'.toLowerCase() ||
      Addes.province.toLowerCase() === 'NakhonSiThammarat'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Narathiwat'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Pattani'.toLowerCase() ||
      Addes.province.toLowerCase() === 'PhangNga'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phatthalung'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Phuket'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Ranong'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Satun'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Songkhla'.toLowerCase() ||
      Addes.province.toLowerCase() === 'SuratThani'.toLowerCase() ||
      Addes.province.toLowerCase() === 'Yala'
    ) {
      Addes.region = 'Southern';
      console.log('Southern');
    }
    console.log(Addes);

    const res = await this.dataSource
      .query(`INSERT INTO STORE_DW (STORE_KEY,STORE_NAME,STORE_NAME_SUBDISTRICT,STORE_NAME_DISTRICT,STORE_NAME_PROVINCE,STORE_NAME_REGION) 
      VALUES(  
       ${Addes.storeId},
              '${Addes.name}' ,
             ' ${Addes.subDistrict}',
             ' ${Addes.District}',
             ' ${Addes.province}',
             ' ${Addes.region}');`);

    // console.log('province: ', province);
    // console.log('dis: ', dis);
    // console.log('subDis: ', subDis);
    // console.log('region: ', region);
    return res;
  }
  async getPayMentMethod(id: string, method: string) {
    const data = await this.dataSource.query(
      `INSERT INTO PAYMENT_METHOD_DW VALUES (${id},'${method}')`,
    );
  }

  async insertDataToTimeDW(date: Date) {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
    const day = ('0' + inputDate.getDate()).slice(-2);
    const hours = ('0' + inputDate.getHours()).slice(-2);
    const minutes = ('0' + inputDate.getMinutes()).slice(-2);
    const seconds = ('0' + inputDate.getSeconds()).slice(-2);
    const milliseconds = ('00' + inputDate.getMilliseconds()).slice(-3);
    const outputDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    // console.log(`INSERT INTO TIME_DW (TIME_ORIGINAL, TIME_DATE, TIME_MONTH, TIME_QUARTER, TIME_YEAR, TIME_DAY_OF_WEEK)
    // VALUES (
    //       CAST('${outputDate}' AS DATETIME),
    //       DAYOFMONTH(CAST('${outputDate}' AS DATETIME)) ,
    //       MONTH(CAST('${outputDate}' AS DATETIME)) ,
    //       QUARTER(CAST('${outputDate}' AS DATETIME)) ,
    //       YEAR(CAST('${outputDate}' AS DATETIME)) ,
    //       DATE_FORMAT(CAST('${outputDate}' AS DATETIME), "%a")
    //     )
    //    `);
    const time = await this.dataSource
      .query(`INSERT INTO TIME_DW (TIME_ORIGINAL, TIME_DATE, TIME_MONTH, TIME_QUARTER, TIME_YEAR, TIME_DAY_OF_WEEK)
      VALUES (
            CAST('${outputDate}' AS DATETIME),
            DAYOFMONTH(CAST('${outputDate}' AS DATETIME)) ,
            MONTH(CAST('${outputDate}' AS DATETIME)) ,
            QUARTER(CAST('${outputDate}' AS DATETIME)) ,
            YEAR(CAST('${outputDate}' AS DATETIME)) ,
            DATE_FORMAT(CAST('${outputDate}' AS DATETIME), "%a")
          )
       `);
    return time;
  }

  async calledViewMaterial() {
    const material = await this.dataSource.query(
      'SELECT * FROM getMaterial_Box',
    );
    const materialList = new Array<Material>();
    for (const material_ of material) {
      const material = new Material();
      const mat = await this.materialsRepository.findOne({
        where: { unit: material_.unit },
      });
      material.id = material_.mat_id;
      material.name = material_.mat_name;
      material.min_quantity = material_.mat_min_quantity;
      material.quantity = material_.mat_quantity;
      material.price_per_unit = material_.mat_price_per_unit;
      material.unit = material_.mat_unit;
      material.createdAt = material_.mat_start_date;
      material.updatedAt = material_.mat_update_date;
      materialList.push(material);
    }
    return materialList;
  }

  async regCustomer(customer: Customer) {
    const name = customer.name.toString();
    const date = customer.createdDate;
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
    const day = ('0' + inputDate.getDate()).slice(-2);
    // const hours = ('0' + inputDate.getHours()).slice(-2);
    // const minutes = ('0' + inputDate.getMinutes()).slice(-2);
    // const seconds = ('0' + inputDate.getSeconds()).slice(-2);
    // const milliseconds = ('00' + inputDate.getMilliseconds()).slice(-3);
    const dateCus = `${year}-${month}-${day}`;
    const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
    const nameCus = nameRegex.exec(name);
    console.log(name);
    const regCus = {
      name: '',
      date: dateCus,
      customerId: customer.id,
    };
    if (name === null) {
      regCus.name = '';
    }
    if (name !== null) {
      regCus.name = nameCus[0];
    }
    console.log(regCus.date);
    const res = await this.dataSource
      .query(`INSERT INTO CUSTOMER_DW (CUSTOMER_KEY,CUSTOMER_NAME,CUSTOMER_START_DATE)
      VALUES(
            ${regCus.customerId},
            '${regCus.name}' ,
            '${regCus.date}');`);

    return res;
  }
  // @Cron(CronExpression.EVERY_10_SECONDS)
  async tryToRun() {
    console.log('update');
    return await this.dataSource.query(`INSERT INTO FACT_TABLE (
      TIME_KEY,
      PAYMENT_ID,
      PRODUCT_KEY,
      CUSTOMER_KEY,
      STORE_KEY,
      TOTAL_OF_SELL,
      AMOUNT_OF_SELL,
      DISCOUNT_OF_SELL
  )
  SELECT
      TIME_DW.TIME_ID,
      PAYMENT_METHOD_DW.PAYMENT_ID,
      PRODUCT_DW.PRODUCT_KEY,
      CUSTOMER_DW.CUSTOMER_KEY,
      STORE_DW.STORE_KEY,
      SUM(order_item.total),
      SUM(order_item.amount),
      SUM(order_.discount)
  FROM
      order_item
  INNER JOIN order_ ON order_item.orderId = order_.id
  INNER JOIN TIME_DW ON CAST(order_.createdDate AS DATETIME) = TIME_DW.TIME_ORIGINAL
  INNER JOIN STORE_DW ON order_.storeId = STORE_DW.STORE_KEY
  INNER JOIN CUSTOMER_DW ON order_.customerId = CUSTOMER_DW.CUSTOMER_KEY
  INNER JOIN PRODUCT_DW ON order_item.productId = PRODUCT_DW.PRODUCT_KEY
  INNER JOIN PAYMENT_METHOD_DW ON order_.payment = PAYMENT_METHOD_DW.PAYMENT_TYPE
  GROUP BY
      TIME_DW.TIME_ID,
      PAYMENT_METHOD_DW.PAYMENT_ID,
      PRODUCT_DW.PRODUCT_KEY,
      CUSTOMER_DW.CUSTOMER_KEY,
      STORE_DW.STORE_KEY,
      order_.employeeId,
      order_.createdDate,
      order_item.productId;
  `);
  }
  async insertDataToTimeMonth() {
    // const inputDate = new Date(date);
    // const year = inputDate.getFullYear();
    // const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
    // const day = ('0' + inputDate.getDate()).slice(-2);
    // const outputDate = `${year}-${month}-${day}`;
    console.log(`INSERT INTO TIME_MONTH(YEAR, QUARTER, MONTH)
    SELECT
        TIME_DW.TIME_YEAR,
        TIME_DW.TIME_QUARTER,
        TIME_DW.TIME_MONTH
    FROM
        TIME_DW
    GROUP BY
        TIME_DW.TIME_YEAR,
        TIME_DW.TIME_QUARTER,
        TIME_DW.TIME_MONTH;
    
        )
     `);
  }
  // @Cron(CronExpression.EVERY_10_SECONDS)
  async insertDataToAggerate() {
    console.log(`INSERT INTO AGGERATE(MONTH_KEY, PAYMENT_ID, PRODUCT_KEY,CUSTOMER_KEY,STORE_KEY,TOTAL_OF_SELL,AMOUNT_OF_SELL,DISCOUNT_OF_SELL)
    SELECT
        TIME_MONTH.MONTH_KEY,
        FACT_TABLE.PAYMENT_ID,
        FACT_TABLE.PRODUCT_KEY,
        FACT_TABLE.CUSTOMER_KEY,
        FACT_TABLE.STORE_KEY,
        SUM(FACT_TABLE.TOTAL_OF_SELL),
        SUM(FACT_TABLE.AMOUNT_OF_SELL),
        SUM(FACT_TABLE.DISCOUNT_OF_SELL)
    FROM
        TIME_MONTH INNER JOIN FACT_TABLE ON TIME_MONTH.MONTH_KEY = FACT_TABLE.TIME_KEY
    GROUP BY
        TIME_MONTH.MONTH_KEY,
        FACT_TABLE.PAYMENT_ID,
        FACT_TABLE.PRODUCT_KEY,
        FACT_TABLE.CUSTOMER_KEY,
        FACT_TABLE.STORE_KEY;
        `);
  }
}
