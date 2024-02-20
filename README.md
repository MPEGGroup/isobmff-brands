# isobmff-brands
This repository contains a set of JSON files representing the boxes defined in various editions of the ISOBMFF specifications and the corresponding brand requirements.
The files are:
- 1 JSON file per edition, e.g. edition1.json, edition2.json, ... Each file describes the boxes that were defined in this edition of the specification, with version and flag information, irrespective of brands.
- 1 JSON file per brand, e.g. isom.json, iso2.json, ... Each file describes: a) the edition in which the brand was defined; b) the previous brand on which this brand is defined; c) the boxes that shall be supported under this brand

This repository also contains a Javascript script that verifies consistency of the various JSON files. 
```
node brand-spec-check.js isoc
```
