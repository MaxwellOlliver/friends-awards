import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Popover } from "@/components/Popover";
import { Textarea } from "@/components/Textarea";
import { categories } from "@/constants/categories";
import { Edit2, MoreVertical, Plus } from "lucide-react";

export const CategoriesTab = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Input
            label="Nome da categoria"
            placeholder="Quem mais jogou videogame"
          />

          <Textarea
            label="Descrição"
            placeholder="Aquele amigo que quase não viu a luz do sol"
          />
          <div className="flex gap-4">
            <Input label="Indicado" placeholder="Nome do indicado" />
            <div className="flex gap-4 mt-[26px]">
              <Button color="primary">
                <Plus className="size-5" />
              </Button>
            </div>
          </div>
          <div className="py-4 flex">
            <span className="text-sm text-gray-500 mx-auto">
              Nenhuma indicado adicionado
            </span>
          </div>
          <Button color="secondary" iconLeft={Plus}>
            Adicionar categoria
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Categorias adicionadas</h1>
          <div className="flex flex-col h-96 overflow-y-auto pr-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col bg-[#ffffff08] p-4 rounded-md"
              >
                <div className="flex items-start gap-2 justify-between">
                  <div>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-lg font-bold ">
                        {category.name}
                      </span>
                    </div>
                    <pre className="text-gray-400 text-wrap break-words">
                      {category.description}
                    </pre>
                  </div>
                  <button>
                    <Popover
                      content={() => (
                        <ul className="bg-black rounded-md overflow-hidden">
                          <li
                            role="button"
                            className="text-white p-2 hover:bg-primary flex items-center gap-2"
                          >
                            <Edit2 className="size-4" />
                            <span>Editar</span>
                          </li>
                          <li
                            role="button"
                            className="text-white p-2 hover:bg-primary"
                          >
                            Remover
                          </li>
                        </ul>
                      )}
                      position="bottom-right"
                    >
                      <MoreVertical className="size-4" />
                    </Popover>
                  </button>
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                  {category.nominees.map((nominee) => (
                    <div
                      key={nominee}
                      className="flex items-center gap-2 p-2 bg-secondary bg-opacity-15 rounded-md text-sm"
                    >
                      <span>{nominee}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
