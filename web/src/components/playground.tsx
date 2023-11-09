import { Textarea } from './ui/textarea'

export function Playground() {
  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Inclua o prompt para IA..."
        />
        <Textarea
          className="resize-none p-4 leading-relaxed"
          readOnly
          placeholder="Resultado gerado pela IA"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a varável{' '}
        <code className="text-violet-400">{'{transcription}'}</code> no seu
        prompt para adicionar a transcrição do video selecionado.
      </p>
    </div>
  )
}
