# Zeroed Web — reposicionamiento a español y marca del fundador

**Decisión rectora:** ZG-007 · 20 de noviembre de 2026  
**Fuente de verdad:** [matiaschababo/zeroed-growth/docs/POSICIONAMIENTO-ZEROED-ES-2026-11-20.md](https://github.com/matiaschababo/zeroed-growth/blob/main/docs/POSICIONAMIENTO-ZEROED-ES-2026-11-20.md)

## Objetivo del sitio

El sitio de Zeroed debe ser una **ventana al conocimiento, la experiencia y los proyectos de Matías Chababo**, no una landing impersonal para captar clientes de una agencia internacional.

- Idioma principal y predeterminado: **español**.
- Zeroed es la plataforma/editorial; **Matías Chababo debe quedar claramente identificado como fundador, autor y profesional**.
- Mostrar criterio, casos reales, procesos y aprendizajes; no prometer resultados ni adjudicar a Zeroed proyectos ajenos.
- Facilitar networking, consultas y oportunidades sin que el sitio parezca un embudo exclusivamente comercial.
- Mantener la marca y el sistema visual existente mientras se redefine el contenido, salvo rediseño separado y aprobado.

## Arquitectura de contenido propuesta

1. **Inicio:** quién es Matías, por qué existe Zeroed, lo que sabe y lo que construye.
2. **Conocimiento:** marketing y performance; IA y automatización; medios/distribución; producción/streaming; negocios.
3. **Proyectos y casos:** participación concreta, problemas, decisiones, pruebas y resultados verificables.
4. **Sistemas:** demostraciones seleccionadas de arquitectura, confiabilidad, operaciones e IA.
5. **Contacto:** conversación, proyectos y colaboraciones, con barrera de entrada proporcional a la oportunidad.

Mantener las rutas antiguas hasta definir una migración sin pérdida de SEO; los nombres de navegación pueden cambiar sin alterar rutas.

## Copy preliminar

**Hero:** «Lo que sé. Lo que construyo.»  
**Presentación:** «Soy Matías Chababo. Zeroed es el espacio donde comparto lo que aprendo y construyo en marketing, medios, automatización con IA y negocios. Ideas, decisiones y proyectos reales, explicados desde adentro.»  
**CTA primario:** «Conocé mi trabajo»  
**CTA secundario:** «Hablemos»

Validar la voz final contra material personal y casos antes de publicación.

## Auditoría necesaria antes de desplegar

- [ ] Revisar **todas las páginas** en vista desktop y mobile: todavía existen encabezados, botones y contenido hardcodeado en inglés.
- [ ] Reemplazar mensajes de agencia de alto ticket / mercado internacional / verticales de riesgo como misión predeterminada.
- [ ] Hacer español predeterminado en cliente, SSR y HTML; revisar que locales EN no se muestren como fallback.
- [ ] Actualizar SEO, Open Graph, datos estructurados, autoría y `lang` de HTML.
- [ ] Revisar página de casos: **no afirmar validación, cifras ni autoría sin evidencia comprobable**.
- [ ] Revisar calculadora de supuesta pérdida/recuperación: fórmulas y resultados no verificados; desactivar o etiquetar simulación antes de producción.
- [ ] Revisar la página de contacto: no asumir presupuestos USD 3k–5k ni prometer tiempos de respuesta no aprobados.
- [ ] Verificar texto en componentes, aria-labels, imágenes/alt, footer y correos.
- [ ] Ejecutar `npm run build` y QA funcional/visual de todas las rutas; obtener aprobación de contenido antes de merge/deploy.

## Gobierno

Los cambios de esta rama constituyen una **primera adecuación documental y de portada, no una migración terminada**. Mantener el PR en borrador hasta completar auditoría, validación de claims y build. No publicar cambios ni modificar entornos/credenciales sin autorización.
