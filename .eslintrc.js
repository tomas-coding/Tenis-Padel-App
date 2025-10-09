/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals", "next"],
  rules: {
    // 🔕 Desactiva error por usar "any"
    "@typescript-eslint/no-explicit-any": "off",

    // 🔕 Opcional: desactiva advertencias por variables no usadas
    "@typescript-eslint/no-unused-vars": "off",
  },
};


