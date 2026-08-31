export type GroupPartner = {
  id: string;
  name: string;
  location: string;
  href: string;
  invertInDark?: boolean;
  logo: {
    src: string;
    width: number;
    height: number;
  };
};

export const groupPartners: GroupPartner[] = [
  {
    id: "figa-stores-limited",
    name: "FIGA Stores Limited",
    location: "UK",
    href: "https://figastore.guru/",
    invertInDark: true,
    logo: {
      src: "/logos/partners/figa-stores-limited.png",
      width: 249,
      height: 129,
    },
  },
  {
    id: "the-t-shirt-factory",
    name: "The T Shirt Factory",
    location: "",
    href: "https://www.thetshirt-factory.co.uk/",
    invertInDark: false,
    logo: {
      src: "/logos/partners/the-t-shirt-factory.png",
      width: 602,
      height: 326,
    },
  },
];
