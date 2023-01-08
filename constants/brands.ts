// const brandName = "AO SMITH";
// const brandName = "American Water Heaters";
// const brandName = "Lochinvar";

export const BRANDS = [
  {
    brandName: 'A.O. Smith',
    logo: '/A. O. Smith - logo - green - 400px wide.png',
    font: 'Franklin Gothic Book',
    boldFont: 'Franklin Gothic Book Bold',
    primaryColor: '#007933',
    secondaryColor: '#a3d65e',
  },
  {
    brandName: 'A.O. Smith @ Lowes',
    logo: '/AOatLowes.png',
    font: 'Open Sans',
    boldFont: 'Open Sans',
    primaryColor: '#012169',
    secondaryColor: '#012169',
  },
  {
    brandName: 'State',
    logo: '/STATE.png',
    font: 'Open Sans',
    boldFont: 'Open Sans',
    primaryColor: '#e7792b',
    secondaryColor: '#e7792b',
  },
  {
    brandName: 'American',
    logo: '/American - logo - color - 400px wide.png',
    font: 'Helvetica LT Std',
    boldFont: 'Helvetica LT Std Bold',
    primaryColor: '#003CA6',
    secondaryColor: '#00BFFF',
  },
  {
    brandName: 'GSW',
    logo: '/GSW.png',
    font: 'Open Sans',
    boldFont: 'Open Sans',
    primaryColor: '#cdc9c4',
    secondaryColor: '#cdc9c4',
  },
  {
    brandName: 'John Woods',
    logo: '/John Wood.png',
    font: 'Open Sans',
    boldFont: 'Open Sans',
    primaryColor: '#0079c6',
    secondaryColor: '#0079c6',
  },
  {
    brandName: 'Reliance',
    logo: '/Reliance.png',
    font: 'Open Sans',
    boldFont: 'Open Sans',
    primaryColor: '#0172c2',
    secondaryColor: '#0172c2',
  },
  {
    brandName: 'Takagi',
    logo: '/Takagi.png',
    font: 'Open Sans',
    boldFont: 'Open Sans',
    primaryColor: '#e60012',
    secondaryColor: '#e60012',
  },
  {
    brandName: 'Lochinvar',
    logo: '/Lochinvar - logo - red - 400px wide.png',
    font: 'Meta',
    boldFont: 'Meta Bold',
    primaryColor: 'rgb(237, 27, 46)',
    secondaryColor: 'rgb(189, 120, 120',
  },
  {
    brandName: 'Us Craftmaster',
    logo: '/USCraftsMaster.png',
    font: 'Open Sans',
    boldFont: 'Open Sans',
    primaryColor: '#006bb5',
    secondaryColor: '#006bb5',
  },
];

export const FINDCONTRACTORLINK = {
  'A.O. Smith': 'https://www.hotwater.com/where-to-buy/search/',
  'A.O. Smith - Retail': 'https://www.hotwater.com/where-to-buy/search/',
  State: 'https://www.statewaterheaters.com/where-to-buy/',
  American: 'https://www.americanwaterheater.com/where-to-buy',
  GSW: 'https://www.gsw-wh.com/en/where-to-buy',
  'John Woods': 'https://www.johnwoodwaterheaters.com/en/find-a-contractor',
  Reliance: 'http://www.reliancewaterheaters.com/buy',
  Takagi: 'https://www.takagi.com/where-to-buy',
  Lochinvar: 'https://www.lochinvar.com/locator',
  'Us Craftsmaster': 'https://www.uscraftmaster.com/',
};

export const getTechnicalSupportNumber = (brand: any) => {
  const productHierachy = localStorage.getItem('productHierachy');

  const returnNumberAO = (number: any) => {
    //splitting numbers in pairs of 3 in an array
    //"001001001001" = ["001", "001", "001", "001"]
    let b = number.match(/.{1,3}/g);
    if (b[0] === '001' && b[1] === '001' && b[2] === '002' && b[3] === '002') {
      return '1-877-553-7659';
    } else if (b[0] === '001' && b[1] === '001' && b[3] === '001') {
      return '1-877-552-0010';
    } else if (
      b[0] === '001' &&
      (b[1] === '001' || b[1] === '0002') &&
      b[2] === '001' &&
      b[3] === '002'
    ) {
      return '1-877-556-4549';
    } else if (b[0] === '001' && b[1] === '002' && b[3] !== '002') {
      return '1-877-559-8556';
    } else {
      return '1-800-527-1953';
    }
  };

  const returnNumberAOatLowes = (number: any) => {
    let b = number.match(/.{1,3}/g);
    if (b[0] === '001' && b[3] === '001') {
      return '1-833-497-3262';
    } else if (b[0] === '001' && b[3] === '002') {
      return '1-877-517-0279';
    } else {
      return '1-877-817-6750';
    }
  };

  let supportNumbers: any = {
    'A.O. Smith': returnNumberAO(productHierachy),
    'A.O. Smith - Retail': returnNumberAOatLowes(productHierachy),
    State: '1-866-667-4960',
    American: '1-800-999-9515',
    GSW: '1-888-479-8324',
    'John Woods': '1-888-479-8324',
    Reliance: '1-888-479-8324',
    Takagi: '1-888-882-5244',
    Lochinvar: '1-800-722-2101',
    'Us Craftsmaster': '1-800-999-9515',
  };

  let supportNumber = supportNumbers[brand] ?? '*Number not found*';

  return supportNumber;
};

// export const BRAND = BRANDS.find(brand => brand.brandName === brandName);
