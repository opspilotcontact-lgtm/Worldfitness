import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-[clamp(5rem,18vw,12rem)] leading-none text-energy">
        404
      </span>
      <h1 className="font-display mt-2 text-3xl text-carbon">Esta página no existe</h1>
      <p className="mt-3 max-w-md text-ink-600">
        Puede que la máquina que buscas haya cambiado de sitio. Vuelve al catálogo o
        cuéntanos qué necesitas.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/catalogo" variant="energy" size="lg">
          Ver catálogo
        </Button>
        <Button href="/" variant="outline" size="lg">
          Ir al inicio
        </Button>
      </div>
    </Container>
  );
}
