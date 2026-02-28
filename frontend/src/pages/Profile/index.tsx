import { Page } from "@/components/Page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_PROFILE } from "@/lib/graphql/mutations/User";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types";
import { useMutation } from "@apollo/client/react";
import { Camera, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("");
}

async function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            const MAX = 256;
            const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(img.width * ratio);
            canvas.height = Math.round(img.height * ratio);
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas context unavailable"));
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Falha ao carregar imagem"));
        };
        img.src = url;
    });
}

export function Profile() {
    const { user, updateUserProfile } = useAuthStore();
    const [name, setName] = useState(user?.name ?? "");
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
        user?.avatarUrl ?? undefined
    );
    // undefined = sem mudança | string = nova foto | null = remover
    const [pendingAvatar, setPendingAvatar] = useState<string | null | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
        onCompleted(data) {
            updateUserProfile(data.updateProfile as User);
            toast.success("Perfil atualizado com sucesso!");
        },
        onError(error) {
            toast.error(error.message ?? "Erro ao atualizar perfil.");
        },
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const base64 = await compressImage(file);
            setAvatarPreview(base64);
            setPendingAvatar(base64);
        } catch {
            toast.error("Não foi possível processar a imagem.");
        }
        e.target.value = "";
    };

    const handleRemoveAvatar = () => {
        setAvatarPreview(undefined);
        setPendingAvatar(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({
            variables: {
                data: {
                    name,
                    ...(pendingAvatar !== undefined && { avatarUrl: pendingAvatar }),
                },
            },
        });
    };

    return (
        <Page title="Meu Perfil">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-6 pt-4">
                {/* Avatar clicável */}
                <div className="flex flex-col items-center gap-3">
                    <div
                        className="relative cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Avatar className="h-24 w-24 border-3 border-gray-400">
                            <AvatarImage src={avatarPreview} alt={name} />
                            <AvatarFallback className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white text-2xl font-light">
                                {getInitials(name || "?")}
                            </AvatarFallback>
                        </Avatar>
                        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white w-6 h-6" />
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Clique para alterar a foto</span>
                    {avatarPreview && (
                        <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remover foto
                        </button>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Email (somente leitura) */}
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={user?.email ?? ""}
                        readOnly
                        disabled
                        className="cursor-not-allowed opacity-60"
                    />
                </div>

                <Button type="submit" disabled={loading || !name.trim()}>
                    {loading ? "Salvando..." : "Salvar alterações"}
                </Button>
            </form>
        </Page>
    );
}
