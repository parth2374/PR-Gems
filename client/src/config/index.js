export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Origin",
    name: "origin",
    componentType: "select",
    options: [
      { id: "africa", label: "Africa" },
      { id: "burma", label: "Burma" },
      { id: "madagascar", label: "Madagascar" },
      { id: "mozambique", label: "Mozambique" },
      { id: "srilanka", label: "Sri Lanka (Ceylon)" },
      { id: "tajikistan", label: "Tajikistan" },
      { id: "tanzania", label: "Tanzania" },
    ],
    placeholder: "Select origin",
  },
  {
    label: "Certificate",
    name: "certificate",
    componentType: "select",
    options: [
      { id: "gia", label: "GIA" },
      { id: "gii", label: "GII" },
      { id: "gjepc", label: "GJEPC" },
      { id: "grs", label: "GRS" },
      { id: "gsi", label: "GSI" },
      { id: "igitl", label: "IGITL" },
    ],
    placeholder: "Select certificate",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Weight",
    name: "weight",
    componentType: "input",
    type: "number",
    placeholder: "Enter weight of the product",
  },
  {
    label: "SKU",
    name: "sku",
    componentType: "input",
    type: "number",
    placeholder: "Enter sku of the product",
  },
  {
    label: "Shape",
    name: "shape",
    componentType: "select",
    options: [
      { id: "cushion", label: "Cushion" },
      { id: "heart", label: "Heart" },
      { id: "octagon", label: "Octagon" },
      { id: "oval", label: "Oval" },
      { id: "pear", label: "Pear" },
      { id: "round", label: "Round" },
    ],
    placeholder: "Select shape",
  },
];

export const shoppingViewHeaderMenuItems = [
  // {
  //   id: "home",
  //   label: "Home",
  //   path: "/shop/home",
  // },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "burma",
    label: "Burma",
    path: "/shop/listing",
  },
  {
    id: "africa",
    label: "Africa",
    path: "/shop/listing",
  },
  {
    id: "tanzania",
    label: "Tanzania",
    path: "/shop/listing",
  },
  {
    id: "madagascar",
    label: "Madagascar",
    path: "/shop/listing",
  },
  {
    id: "mozambique",
    label: "Mozambique",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const originOptionsMap = {
  africa: "Africa",
  burma: "Burma",
  madagascar: "Madagascar",
  mozambique: "Mozambique",
  srilanka: "Sri Lanka",
  tajikistan: "Tajikistan",
  tanzania: "Tanzania"
};

export const certificateOptionsMap = {
  gia: "GIA",
  gii: "GII",
  gjepc: "GJEPC",
  grs: "GRS",
  gsi: "GSI",
  igitl: "IGITL"
};

export const shapeOptionsMap = {
  cushion: "Cushion",
  heart: "Heart",
  octagon: "Octagon",
  oval: "Oval",
  pear: "Pear",
  round: "Round"
};

export const filterOptions = {
  origin: [
    { id: "all",    label: "All origins" },
    { id: "africa", label: "Africa" },
    { id: "burma", label: "Burma" },
    { id: "madagascar", label: "Madagascar" },
    { id: "mozambique", label: "Mozambique" },
    { id: "srilanka", label: "Sri Lanka (Ceylon)" },
    { id: "tajikistan", label: "Tajikistan" },
    { id: "tanzania", label: "Tanzania" },
  ],
  certificate: [
    { id: "all",    label: "All certificates" },
    { id: "gia", label: "GIA" },
    { id: "gii", label: "GII" },
    { id: "gjepc", label: "GJEPC" },
    { id: "grs", label: "GRS" },
    { id: "gsi", label: "GSI" },
    { id: "igitl", label: "IGITL" },
  ],
  shape: [
    { id: "all",     label: "All shapes" },
    { id: "cushion", label: "Cushion" },
    { id: "heart", label: "Heart" },
    { id: "octagon", label: "Octagon" },
    { id: "oval", label: "Oval" },
    { id: "pear", label: "Pear" },
    { id: "round", label: "Round" },
  ]
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "weight-lowtohigh", label: "Weight: Low to High" },
  { id: "weight-hightolow", label: "Weight: High to Low" },
];
