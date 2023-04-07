import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Catagory } from 'src/catagories/entities/catagory.entity';
import { Material } from 'src/materials/entities/material.entity';
import { Store } from 'src/stores/entities/store.entity';

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
      Addes.province === 'ChiangRai' ||
      Addes.province === 'ChiangMai' ||
      Addes.province === 'Nan' ||
      Addes.province === 'Phayao' ||
      Addes.province === 'Phrae' ||
      Addes.province === 'MaeHongSon' ||
      Addes.province === 'Lampang' ||
      Addes.province === 'Lamphun' ||
      Addes.province === 'Uttaradit'
    )
      Addes.region = 'Northern';

    if (
      Addes.province === 'Bangkok' ||
      Addes.province === 'KamphaengPhet' ||
      Addes.province === 'ChaiNat' ||
      Addes.province === 'NakhonNayok' ||
      Addes.province === 'NakhonPathom' ||
      Addes.province === 'NakhonSawan' ||
      Addes.province === 'Nonthaburi' ||
      Addes.province === 'PathumThani' ||
      Addes.province === 'PhraNakhonSiAyutthaya' ||
      Addes.province === 'Phichit' ||
      Addes.province === 'Phitsanulok' ||
      Addes.province === 'Phetchabun' ||
      Addes.province === 'Lopburi' ||
      Addes.province === 'SamutPrakan' ||
      Addes.province === 'SamutSakhon' ||
      Addes.province === 'SingBuri' ||
      Addes.province === 'Sukhothai' ||
      Addes.province === 'SuphanBuri' ||
      Addes.province === 'Saraburi' ||
      Addes.province === 'AngThong' ||
      Addes.province === 'UthaiThani' ||
      Addes.province === 'SamutPrakan'
    )
      Addes.region = 'Central';

    if (
      Addes.province === 'Kalasin' ||
      Addes.province === 'KhonKaen' ||
      Addes.province === 'Chaiyaphum' ||
      Addes.province === 'NakhonPhanom' ||
      Addes.province === 'NakhonRatchasima' ||
      Addes.province === 'BuengKan' ||
      Addes.province === 'Buriram' ||
      Addes.province === 'MahaSarakham' ||
      Addes.province === 'Mukdahan' ||
      Addes.province === 'Yasothon' ||
      Addes.province === 'RoiEt' ||
      Addes.province === 'SakonNakhon' ||
      Addes.province === 'Surin ' ||
      Addes.province === 'Sisaket' ||
      Addes.province === 'NongKhai' ||
      Addes.province === 'NongBuaLamphu' ||
      Addes.province === 'UdonThani' ||
      Addes.province === 'UbonRatchathani' ||
      Addes.province === 'AmnatCharoen' ||
      Addes.province === 'Buriram'
    )
      Addes.region = 'Northeastern';

    if (
      Addes.province === 'Chanthaburi' ||
      Addes.province === 'Chachoengsao' ||
      Addes.province === 'จังหวัดชลบุรี' ||
      Addes.province === 'Trat' ||
      Addes.province === 'Prachinburi' ||
      Addes.province === 'Rayong' ||
      Addes.province === 'SaKaeo'
    )
      Addes.region = 'Eastern';

    if (
      Addes.province === 'Kanchanaburi' ||
      Addes.province === 'Tak' ||
      Addes.province === 'Prachuap' ||
      Addes.province === 'KhiriKhan' ||
      Addes.province === 'Phetchaburi' ||
      Addes.province === 'Ratchaburi'
    )
      Addes.region = 'Western';

    if (
      Addes.province === 'Krabi' ||
      Addes.province === 'Chumphon' ||
      Addes.province === 'Trang' ||
      Addes.province === 'NakhonSiThammarat' ||
      Addes.province === 'Narathiwat' ||
      Addes.province === 'Pattani' ||
      Addes.province === 'PhangNga' ||
      Addes.province === 'Phatthalung' ||
      Addes.province === 'Phuket' ||
      Addes.province === 'Ranong' ||
      Addes.province === 'Satun' ||
      Addes.province === 'Songkhla ' ||
      Addes.province === 'SuratThani' ||
      Addes.province === 'Yala'
    )
      Addes.region = 'Southern';
    else Addes.region = '';

    // const res = await this.dataSource
    //   .query(`INSERT INTO STORE_DW (STORE_KEY,STORE_NAME,STORE_NAME_SUBDISTRICT,STORE_NAME_DISTRICT,province,STORE_NAME_REGION)
    // VALUES(   ${storeId} ,
    //           ${storeName} ,
    //           ${subDis},
    //           ${dis},
    //           ${province},
    //           ${region})`);

    console.log('rode: ', rode);
    console.log('province: ', province);
    console.log('dis: ', dis);
    console.log('subDis: ', subDis);
    console.log('region: ', region);
    // return res;
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

  regCustomer() {
    const name = 'Manita Intharachot';
    const date = '2023-04-02T01:26:10.910Z';
    const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
    const dateRegex =
      /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;
    const nameCus = nameRegex.exec(name);
    const dateCus = dateRegex.exec(date);
    // if (!nameCus[1]) {
    //   nameCus[1] = '';
    // }
    // if (!dateCus[1]) {
    //   dateCus[1] = '';
    // }
    console.log('Name: ', nameCus);
    console.log('Date: ', dateCus);
  }
}



