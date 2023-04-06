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
    let region = '';
    const storeId = store.id;
    const storeName = store.name;
    const Addes = {
      rode: '',
      province: '',
      region: '',
      subDistrict: '',
    };
    if (rode === null || !rode[1] || rode[1] === null) {
      rode[1] = '';
    }
    if (province === null || !province[1] || province[1] === null) {
      province[1] = '';
    }
    if (province === null || !dis[1] || province[1] === null) {
      dis[1] = '';
    }
    if (!subDis[1] || subDis[1] === null || subDis === null) {
      subDis[1] = '';
    }
    if (
      province[1] === 'ChiangRai' ||
      province[1] === 'ChiangMai' ||
      province[1] === 'Nan' ||
      province[1] === 'Phayao' ||
      province[1] === 'Phrae' ||
      province[1] === 'MaeHongSon' ||
      province[1] === 'Lampang' ||
      province[1] === 'Lamphun' ||
      province[1] === 'Uttaradit'
    )
      region = 'Northern';

    if (
      province[1] === 'Bangkok' ||
      province[1] === 'KamphaengPhet' ||
      province[1] === 'ChaiNat' ||
      province[1] === 'NakhonNayok' ||
      province[1] === 'NakhonPathom' ||
      province[1] === 'NakhonSawan' ||
      province[1] === 'Nonthaburi' ||
      province[1] === 'PathumThani' ||
      province[1] === 'PhraNakhonSiAyutthaya' ||
      province[1] === 'Phichit' ||
      province[1] === 'Phitsanulok' ||
      province[1] === 'Phetchabun' ||
      province[1] === 'Lopburi' ||
      province[1] === 'SamutPrakan' ||
      province[1] === 'SamutSakhon' ||
      province[1] === 'SingBuri' ||
      province[1] === 'Sukhothai' ||
      province[1] === 'SuphanBuri' ||
      province[1] === 'Saraburi' ||
      province[1] === 'AngThong' ||
      province[1] === 'UthaiThani' ||
      province[1] === 'SamutPrakan'
    )
      region = 'Central';

    if (
      province[1] === 'Kalasin' ||
      province[1] === 'KhonKaen' ||
      province[1] === 'Chaiyaphum' ||
      province[1] === 'NakhonPhanom' ||
      province[1] === 'NakhonRatchasima' ||
      province[1] === 'BuengKan' ||
      province[1] === 'Buriram' ||
      province[1] === 'MahaSarakham' ||
      province[1] === 'Mukdahan' ||
      province[1] === 'Yasothon' ||
      province[1] === 'RoiEt' ||
      province[1] === 'SakonNakhon' ||
      province[1] === 'Surin ' ||
      province[1] === 'Sisaket' ||
      province[1] === 'NongKhai' ||
      province[1] === 'NongBuaLamphu' ||
      province[1] === 'UdonThani' ||
      province[1] === 'UbonRatchathani' ||
      province[1] === 'AmnatCharoen' ||
      province[1] === 'Buriram'
    )
      region = 'Northeastern';

    if (
      province[1] === 'Chanthaburi' ||
      province[1] === 'Chachoengsao' ||
      province[1] === 'จังหวัดชลบุรี' ||
      province[1] === 'Trat' ||
      province[1] === 'Prachinburi' ||
      province[1] === 'Rayong' ||
      province[1] === 'SaKaeo'
    )
      region = 'Eastern';

    if (
      province[1] === 'Kanchanaburi' ||
      province[1] === 'Tak' ||
      province[1] === 'Prachuap' ||
      province[1] === 'KhiriKhan' ||
      province[1] === 'Phetchaburi' ||
      province[1] === 'Ratchaburi'
    )
      region = 'Western';

    if (
      province[1] === 'Krabi' ||
      province[1] === 'Chumphon' ||
      province[1] === 'Trang' ||
      province[1] === 'NakhonSiThammarat' ||
      province[1] === 'Narathiwat' ||
      province[1] === 'Pattani' ||
      province[1] === 'PhangNga' ||
      province[1] === 'Phatthalung' ||
      province[1] === 'Phuket' ||
      province[1] === 'Ranong' ||
      province[1] === 'Satun' ||
      province[1] === 'Songkhla ' ||
      province[1] === 'SuratThani' ||
      province[1] === 'Yala'
    )
      region = 'Southern';
    else region = '';

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