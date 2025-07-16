'use client'
import { Input } from "antd";
const { Search } = Input;
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

export default function AdminReservationsPageSearchBar() {

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <Search
            placeholder="ابحث"
            enterButton="ابحث"
            size="large"
            onSearch={onSearch}
            onChange={(e) => console.log("Typing:", e.target.value)}
        />
    );
}