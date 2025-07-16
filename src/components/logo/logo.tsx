import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <div className="w-16 h-16">
            <Link href="/">
                <Image
                    src="/images/logo_160x160.svg"
                    alt="Company logo"
                    width={48}
                    height={48}
                />
            </Link>
        </div>
    );
}
