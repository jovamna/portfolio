def jwt_payload_handler(user):
    # Aquí defines cómo se genera el payload del token JWT
    # Puede ser tan simple como retornar un diccionario con los datos del usuario
    return {
        'user_id': user.id,
        'email': user.email,
        # ... otros campos que quieras incluir en el payload ...
    }
