import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { User } from "src/t/shared";
import { customerBaseUrl } from "../../src/utils/baseUrl";

export const getUser: () => User | null = () => {
  const str = localStorage.getItem("user");
  return str ? (JSON.parse(str) as User) : null;
};

export const useUser = () =>
  useMemo(() => {
    const str = localStorage.getItem("user");
    return str ? (JSON.parse(str) as User) : null;
  }, []);

type Type = any[] | {} | null;

export const useData = <T extends Type>(
  endpoint: string,
  auth: boolean = true
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    const str = localStorage.getItem("user");
    const user = JSON.parse(str) as User;
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<{ data: any }>(
          `${customerBaseUrl}${endpoint}`,
          {
            headers: auth ? { Authorization: `${user?.token}` } : undefined,
          }
        );
        setData(data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [auth, endpoint]);

  return { data, loading } as { data: any; loading: boolean };
};
