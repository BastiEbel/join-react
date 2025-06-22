import Input from "../ui/Input";
import styles from "../css/AddCategory.module.css";
import Button from "../ui/Button";

type AddCategoryProps = {
  onClose: () => void;
};

export default function AddCategory({ onClose }: AddCategoryProps) {
  return (
    <div className={styles.containerCategoryAdd}>
      <div className={styles.containerTitle}>
        <h2 className={styles.title}>Add Category</h2>
        <div className={styles.spacer}></div>
      </div>
      <div className={styles.containerCategoryInput}>
        <label className={styles.labelCategory}>Category Name:</label>
        <Input
          className={styles.categoryInput}
          type="text"
          required={false}
          placeholder="examples: Sales, Marketing"
        />
      </div>
      <div className={styles.containerBtn}>
        <Button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </Button>
        <Button className={styles.addCategoryBtn}>Add Category</Button>
      </div>
    </div>
  );
}
