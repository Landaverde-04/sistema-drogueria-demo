from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .models import Usuario
from .forms import UsuarioCrearForm, UsuarioEditarForm


@login_required
def lista_usuarios(request):
    usuarios = Usuario.objects.all().order_by('username')
    return render(request, 'seguridad/lista_usuarios.html', {'usuarios': usuarios})


@login_required
def crear_usuario(request):
    if request.method == 'POST':
        form = UsuarioCrearForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Usuario creado correctamente.')
            return redirect('seguridad:lista_usuarios')
    else:
        form = UsuarioCrearForm()
    return render(request, 'seguridad/form_usuario.html', {'form': form, 'accion': 'Crear'})


@login_required
def editar_usuario(request, id):
    usuario = get_object_or_404(Usuario, pk=id)
    if request.method == 'POST':
        form = UsuarioEditarForm(request.POST, instance=usuario)
        if form.is_valid():
            form.save()
            messages.success(request, 'Usuario actualizado correctamente.')
            return redirect('seguridad:lista_usuarios')
    else:
        form = UsuarioEditarForm(instance=usuario)
    return render(request, 'seguridad/form_usuario.html', {'form': form, 'accion': 'Editar', 'usuario': usuario})


@login_required
def eliminar_usuario(request, id):
    usuario = get_object_or_404(Usuario, pk=id)
    if request.method == 'POST':
        usuario.delete()
        messages.success(request, 'Usuario eliminado correctamente.')
        return redirect('seguridad:lista_usuarios')
    return render(request, 'seguridad/eliminar_usuario.html', {'usuario': usuario})
