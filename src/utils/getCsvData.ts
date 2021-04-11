import reader from "neat-csv";
import fs from "fs";

export const getCsvData = async (file: any) => {
  //   console.log(file);
  const raw = fs.readFileSync(file.path);
  const content = await reader(raw);
  return content;
};
