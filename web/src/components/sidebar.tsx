'use client'
import { FileVideo, Upload, Wand2 } from 'lucide-react'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { Slider } from './ui/slider'

export function Sidebar() {
  return (
    <aside className="w-80 space-y-3">
      <form className="space-y-5">
        <label
          htmlFor="video"
          className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap- items-center justify-center text-muted-foreground hover:bg-primary-foreground"
        >
          <FileVideo className="h-4 w-4" />
          Selecione um video
        </label>
        <input type="file" id="video" accept="video/mp4" className="sr-only" />

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
          <Textarea
            id="transcription_prompt"
            className="resize-none h-20 leading-relaxed"
            placeholder="Inclua palavras-chave mencionadas no vídeo separadas por virgula (,)"
          />
        </div>

        <Button type="submit" className="w-full">
          Carregar vídeo
          <Upload className="w-4 h-4 ml-2" />
        </Button>
      </form>
      <form className="space-y-5">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um prompt..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Título do YouTube</SelectItem>
              <SelectItem value="description">Descrição do YouTube</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Modelo</Label>
          <Select defaultValue="gpt-4">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5">GPT 3.5-turbo 16k</SelectItem>
              <SelectItem value="gpt-4">GPT 4</SelectItem>
            </SelectContent>
          </Select>
          <span className="block text-xs text-muted-foreground italic">
            Recomendo utilizar o GPT-4
          </span>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Temperatura</Label>
          <Slider min={0} max={1} step={0.1} />
          <span className="block text-xs text-muted-foreground italic leading-relaxed">
            Valores mais altos tendem a deixar o resultado mais criativo com
            possíveis erros.
          </span>
        </div>

        <Separator />

        <Button type="submit" className="w-full">
          Executar
          <Wand2 className="h-4 w-4 ml-2" />
        </Button>
      </form>
    </aside>
  )
}
