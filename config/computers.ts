import { Framework12, Framework13, Framework16, FrameworkDesktop, Computers } from "@/types";

const framework12: Framework12 = {
    "ram": {
        "slots": 1,
        "maxTotal": 48,
        "maxPerSlot": 48
    },
    "storage": {
        "slots": 1,
        "sizes": [2230]
    },
    "cpu": {
        "i3-1315U": {
            "clockSpeed": 4.5,
            "cores": 2,
            "threads": 4
        },
        "i5-1334U": {
            "clockSpeed": 4.6,
            "cores": 2,
            "threads": 8
        }
    },
    "power": 60
};

const framework13: Framework13 = {
    "ram": {
        "slots": 2,
        "maxTotal": 96,
        "maxPerSlot": 48
    },
    "storage": {
        "slots": 1,
        "sizes": [2280]
    },
    "old builds": {
        "amd": {
            "AMD Ryzen™ 5 7640U": {
                "clockSpeed": 4.9,
                "cores": 6,
                "threads": 12,
                "battery": 61,
                "webcamGen": 2,
                "displayInfo": '13.5" 2256x1504 60Hz 2.2K matte display'
            },
            "AMD Ryzen™ 5 7640U (2.8k Display)": {
                "clockSpeed": 4.9,
                "cores": 6,
                "threads": 12,
                "battery": 61,
                "webcamGen": 2,
                "displayInfo": '13.5" 2880x1920 120Hz 2.8K matte display '
            }
        }
    },
    "new builds": {
        "cpu": {
            "amd": {
                "Ryzen™ AI 5 340": {
                    "clockSpeed": 4.8,
                    "cores": 6,
                    "threads": 12
                },
                "Ryzen™ AI 7 350": {
                    "clockSpeed": 5,
                    "cores": 8,
                    "threads": 16
                },
                "Ryzen™ AI 9 HX 370": {
                    "clockSpeed": 5.1,
                    "cores": 12,
                    "threads": 24
                }
            },
            "intel": {
                "Ultra 5 125H": {
                    "clockSpeed": 4.5,
                    "cores": 4,
                    "threads": 8
                },
                "Ultra 7 155H": {
                    "clockSpeed": 4.8,
                    "cores": 6,
                    "threads": 8
                },
                "Ultra 7 165H": {
                    "clockSpeed": 5,
                    "cores": 6,
                    "threads": 12
                }
            }
        },
        "display": {
            "2.2K Display": '13.5" 2256 x 1504 60Hz 2.2K matte display',
            "2.8K Display (rounded)": '13.5" 2880x1920 120Hz matte display'
        }
    },
    "power": 60
};

const framework16: Framework16 = {
    "ram": {
        "slots": 2,
        "maxTotal": 96,
        "maxPerSlot": 48
    },
    "storage": {
        "slots": 2,
        "sizes": [2280, 2230]
    },
    "cpu": {
        "Ryzen™ 7 7840HS": {
            "clockSpeed": 5.1,
            "cores": 8,
            "threads": 16
        },
        "Ryzen™ 9 7940HS": {
            "clockSpeed": 5.2,
            "cores": 8,
            "threads": 16
        },
        "Ryzen™ AI 7 350": {
            "clockSpeed": 5,
            "cores": 8,
            "threads": 16
        },
        "Ryzen™ AI 9 HX 370": {
            "clockSpeed": 5.1,
            "cores": 12,
            "threads": 24
        }
    },
    "minPower": 100,
    "recomendedPower": 180,
    "maxPower": 240
};

const frameworkDesktop: FrameworkDesktop = {
    "builds": {
        "Max 385 - 32GB": {
            "cpu": {
                "clockSpeed": 5,
                "cores": 8,
                "threads": 16
            },
            "ram": {
                "amount": 32,
                "type": "LPDDR5x"
            },
            "graphics": {
                "clockspeed": 2.8,
                "cores": 32
            }
        },
        "Max+ 395 - 64GB": {
            "cpu": {
                "clockSpeed": 5.1,
                "cores": 16,
                "threads": 32,
            },
            "ram": {
                "amount": 64,
                "type": "LPDDR5x"
            },
            "graphics": {
                "clockspeed": 2.9,
                "cores": 40
            }
        },
        "Max+ 395 - 128GB": {
            "cpu": {
                "clockSpeed": 5.1,
                "cores": 16,
                "threads": 32
            },
            "ram": {
                "amount": 128,
                "type": "LPDDR5x"
            },
            "graphics": {
                "clockspeed": 2.9,
                "cores": 40
            }
        }
    },
    "storage": {
        "sizes": [2280],
        "slots": 2
    }
};

export const computers: Computers = {
    laptops: {
        framework12: framework12,
        framework13: framework13,
        framework16: framework16
    },
    desktops: {
        desktop: frameworkDesktop
    }
};