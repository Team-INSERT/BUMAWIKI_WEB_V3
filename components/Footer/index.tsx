import Link from "next/link";
import { GithubIcon } from "@/assets";
import * as styles from "./style.css";

/* eslint-disable */

const Footer = () => {
  return (
    <footer className={styles.container}>
      <Link href="https://github.com/Team-INSERT" target="_blank" rel="noreferrer">
        <img
          src="https://developer.apple.com/swift/images/swift-og.png"
          style={{ width: "100px" }}
        />
      </Link>
      <p className={styles.information}>
        By writing swiftly in Swift, we’re able to take advantage of the language’s features,
        support, and ecosystem of related projects. Swift comes with standard library features for
        working with the filesystem in its Foundation module. For network operations Async HTTP
        Client is there to work the HTTP requests. And to retrieve the latest Swift release, swiftly
        uses the Swift OpenAPI plugin to generate the code to interact with the swift.org website.
        Lastly, it takes advantage of Swift’s interoperability with C to use the existing libarchive
        library to work with archives. swiftly uses libarchive to extract the toolchains downloaded
        from the Swift website and the integration is simple. It can be challenging to build shell
        programs that work well across multiple platforms with minimal system dependencies; this
        motivated us to switch swiftly away from using a shell program to install it and become a
        self-installing binary application. swiftly has access to excellent argument parsing
        capabilities, beautiful --help screens, and the full standard library. The only remaining
        problem was being able to deliver the operating system and processor architecture specific
        binary to the users system with simplicity. The swift.org website helps with operating
        system detection, but it cannot reliably detect the Linux distribution. Luckily, there is
        the Swift Static Linux SDK that makes binaries that work with a wide range of distributions.
        The processor architecture can be determined on most unixes using uname -m . The result of
        all of this is the simplicity of a copy and paste from the website to your terminal and get
        started with Swift.
      </p>
    </footer>
  );
};

export default Footer;
