/** Renderiza JSON-LD. Server component, sin coste de cliente. */
export function SchemaMarkup({ schema }: { schema: object | object[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {payload.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
