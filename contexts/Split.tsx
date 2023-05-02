import {
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

export type Item = {
  amount: number;
  id: string;
};

export type Person = {
  name: string;
  items: Item[];
  total: number;
  id: string;
};

export type SplitContextData = {
  /** Total expense, in cents. */
  total: number;

  /** SetStateAction for total. */
  setTotal: React.Dispatch<SetStateAction<number>>;

  /** Array of Person types. */
  persons: Person[];

  /** SetStateAction for persons */
  setPersons: React.Dispatch<SetStateAction<Person[]>>;

  /** Reset persons state to default value */
  resetPersons: () => void;

  /** Returns a function that sets persons[index] to the supplied person. */
  setPerson: (index: number) => (person: Person) => void;

  /** Tip for the bill, in cents. */
  tip: number;

  /** SetStateAction for tip. */
  setTip: React.Dispatch<SetStateAction<number>>;

  /** Total minus all personal totals.
   * This amount will be split evenly among the persons */
  shared: number;
};

export const SplitContext = createContext({} as SplitContextData);

export const SplitProvider = ({ children }: { children: ReactNode }) => {
  const defaultPersons: Person[] = [
    { name: "", items: [], total: 0, id: uuidv4() },
    { name: "", items: [], total: 0, id: uuidv4() },
  ];

  const [total, setTotal] = useState<number>(0);
  const [persons, setPersons] = useState<Person[]>(defaultPersons);
  const [tip, setTip] = useState<number>(0);

  useEffect(() => {
    console.log("PERSONS: \n" + JSON.stringify(persons, null, "  "));
  }, [persons]);

  const resetPersons = () => setPersons(defaultPersons);

  const setPerson = (index: number) => {
    return (person: Person) => {
      const personalTotal = person.items
        .map((item) => item.amount)
        .reduce((prevAmount, currentAmount) => prevAmount + currentAmount);

      setPersons(prevPersons => [
        ...prevPersons.slice(0, index),
        { ...person, total: personalTotal },
        ...prevPersons.slice(index + 1),
      ]);
    };
  };

  const shared =
    total -
    persons
      .map(person => person.total)
      .reduce((prevTotal, currentTotal) => prevTotal + currentTotal);

  const splitContextData: SplitContextData = {
    total,
    setTotal,
    persons,
    setPersons,
    setPerson,
    resetPersons,
    tip,
    setTip,
    shared,
  };

  return (
    <SplitContext.Provider value={splitContextData}>
      {children}
    </SplitContext.Provider>
  );
};
