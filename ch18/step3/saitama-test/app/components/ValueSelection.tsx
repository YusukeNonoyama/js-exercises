import { DataSelection } from "../type";

type ValueSelectionProps = {
  setDataSelection: React.Dispatch<React.SetStateAction<DataSelection>>;
  dataSelection: DataSelection;
};

const ValueSelection: React.FC<ValueSelectionProps> = ({
  setDataSelection,
  dataSelection,
}) => {
  //   const [valueSelected, setValueSelected] = useState("");
  return (
    <label>
      市町村セット：
      <select
        value={dataSelection}
        onChange={(e) => setDataSelection(e.target.value as DataSelection)}
      >
        <option value="current">現在の市町村（63）</option>
        <option value="current-hard">現在 – 難読（16）</option>
        <option value="heisei">平成の大合併前（92）</option>
        <option value="heisei-hard">平成の大合併前 – 難読（27）</option>
        <option value="heisei-merged">平成の大合併前 - 消滅市町村（32）</option>
        <option value="test">test（3）</option>
      </select>
    </label>
  );
};

export default ValueSelection;
