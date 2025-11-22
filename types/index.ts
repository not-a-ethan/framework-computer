import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Ram {
  "slots": number,
  "maxTotal": number,
  "maxPerSlot": number
};

export interface Storage {
  "slots": number,
  "sizes": number[]
}

export interface CPU {
  "clockSpeed": number,
  "cores": number,
  "threads": number
};

export interface Fw13Package extends CPU {
  "battery": number,
  "webcamGen": number,
  "displayInfo": string
}



export interface Framework12 {
  "ram": Ram,
  "storage": Storage,
  "cpu": {
    "i3-1315U": CPU,
    "i5-1334U": CPU
  },
  "power": number
};

export interface Framework13 {
  "ram": Ram,
  "storage": Storage,
  "old builds": {
    "amd": {
      "AMD Ryzen™ 5 7640U": Fw13Package,
      "AMD Ryzen™ 5 7640U (2.8k Display)": Fw13Package
    }
  },
  "new builds": {
    "cpu": {
      "amd": {
        "Ryzen™ AI 5 340": CPU,
        "Ryzen™ AI 7 350": CPU,
        "Ryzen™ AI 9 HX 370": CPU
      },
      "intel": {
        "Ultra 5 125H": CPU,
        "Ultra 7 155H": CPU,
        "Ultra 7 165H": CPU
      }
    },
    "display": {
      "2.2K Display": string,
      "2.8K Display (rounded)": string
    }
  },
  "power": number
};

export interface Framework16 {
  "ram": Ram,
  "storage": Storage,
  "cpu": {
    "Ryzen™ 7 7840HS": CPU,
    "Ryzen™ 9 7940HS": CPU,
    "Ryzen™ AI 7 350": CPU,
    "Ryzen™ AI 9 HX 370": CPU
  },
  "minPower": number,
  "recomendedPower": number,
  "maxPower": number
};

export interface FrameworkDesktop {

};

export interface Computers {
  "laptops": {
    "framework12": Framework12,
    "framework13": Framework13,
    "framework16": Framework16
  },
  "desktops": {
    "desktop": FrameworkDesktop
  }
};