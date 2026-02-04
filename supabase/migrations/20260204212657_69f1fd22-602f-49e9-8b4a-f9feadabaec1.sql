-- =============================================
-- ETAPA 1: Apenas ENUMs (sem dependências)
-- =============================================

-- Roles de permissão do sistema
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Tipos de usuário na plataforma
CREATE TYPE public.tipo_usuario AS ENUM ('cliente', 'socio', 'gestor', 'dependente');

-- Status de assinatura
CREATE TYPE public.tipo_status_assinatura AS ENUM ('ativa', 'cancelada', 'suspensa', 'expirada');

-- Status de pagamento
CREATE TYPE public.tipo_status_pagamento AS ENUM ('pendente', 'aprovado', 'recusado', 'estornado');

-- Tipos de lembrete
CREATE TYPE public.tipo_lembrete AS ENUM ('agua', 'refeicao', 'peso', 'exercicio', 'meditacao');

-- Tipos de líquido
CREATE TYPE public.tipo_liquido AS ENUM ('água', 'suco', 'chá', 'café', 'refrigerante', 'outro');

-- Intensidade de exercício
CREATE TYPE public.tipo_intensidade_exercicio AS ENUM ('leve', 'moderada', 'intensa');

-- Status de envio
CREATE TYPE public.tipo_status_envio AS ENUM ('pendente', 'enviado', 'erro');

-- Objetivos do usuário
CREATE TYPE public.tipo_objetivo AS ENUM ('perder_peso', 'manter_peso', 'ganhar_peso', 'melhorar_saude');

-- Níveis de dificuldade
CREATE TYPE public.tipo_nivel_dificuldade AS ENUM ('facil', 'moderado', 'dificil');

-- =============================================
-- FUNÇÕES DE TRIGGER (sem dependências)
-- =============================================

-- Função para atualizar timestamp updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Função para atualizar timestamp de guias
CREATE OR REPLACE FUNCTION public.update_guide_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Verifica se é o próprio usuário (sem dependências de tabela)
CREATE OR REPLACE FUNCTION public.is_current_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() = _user_id
$$;