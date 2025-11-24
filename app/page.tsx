import { Link } from "@heroui/link";

import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <main className={`${styles.page}`}>
      <h1>Framework Comparator</h1>

      <p>Compare diffrent modals of Framework devices.</p>

      <br />

      <div className={`${styles.grid}`}>
        <div className={styles.col1}>
          <h2>Framework 12</h2>

          <p>Framework Laptop 12 is a 12.2” convertible with stylus support. Designed for easy customization, upgrades, and repairs.</p>
        </div>

        <div className={styles.col2}>
          <h2>Framework 13</h2>

          <p>Framework Laptop 13 is a thin, light, fast 13.5” notebook that is simple to customize, upgrade, and repair, so it stays yours for longer.</p>
        </div>

        <div className={styles.col3}>
          <h2>Framework 16</h2>

          <p>With an upgradeable Mainboard and Graphics Module, dual DDR5 SO-DIMM slots, and two standard M.2 storage slots, the Framework Laptop 16 is built for performance and flexibility. Every component is accessible with a single screwdriver, making repairs and upgrades fast and easy.</p>
        </div>

        <div className={styles.col4}>
          <h2>Framework Desktop</h2>

          <p>Massive gaming capability, heavy-duty AI compute, and standard PC parts, all in 4.5L.</p>
        </div>
      </div>

      <h1>Compare the specs on the <Link href="compare">Compare Page</Link></h1>
    </main>
  );
};